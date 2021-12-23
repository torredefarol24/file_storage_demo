const { Traffic } = require("./model");
const { reachedTransferLimit } = require("../../utility");

class TrafficService {
  static async checkLimit(trafficParams) {
    try {
      var result = {
        hasError: false,
      };
      const traffic = await Traffic.find(trafficParams).sort({
        createdAt: -1,
      });

      if (!reachedTransferLimit(traffic)) {
        await Traffic.create(trafficParams);
      } else {
        result.hasError = true;
        result.statusCode = 468;
        result.message = "Download Limit reached!";
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
