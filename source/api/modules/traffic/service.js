const { Traffic } = require('./model');
const { File } = require('../files/model');
const { TRANSFER_TYPES } = require('../../config');
const { reachedTransferLimit } = require('../../utility');

class TrafficService {
  static async checkDownloadLimit(trafficParams) {
    try {
      const result = {
        hasError: false,
      };
      const traffic = await Traffic.find(trafficParams).sort({
        createdAt: -1,
      });

      if (!reachedTransferLimit(traffic, TRANSFER_TYPES.DOWNLOAD)) {
        await Traffic.create(trafficParams);
        const findFilter = { _id: trafficParams.fileId };
        const updateInfo = {
          lastDownloadedAt: new Date(),
        };
        await File.findOneAndUpdate(findFilter, updateInfo);
      } else {
        result.hasError = true;
        result.statusCode = 468;
        result.message = 'Download Limit reached!';
      }

      return result;
    } catch (err) {
      throw err;
    }
  }

  static async checkUploadLimit(userId) {
    try {
      const result = {
        hasError: false,
      };
      const findFilter = {
        userId,
        deletedAt: null,
      };
      const files = await File.find(findFilter).sort({
        createdAt: -1,
      });

      if (reachedTransferLimit(files, TRANSFER_TYPES.UPLOAD)) {
        result.hasError = true;
        result.statusCode = 478;
        result.message = 'Upload Limit reached!';
      }

      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  TrafficService,
};
