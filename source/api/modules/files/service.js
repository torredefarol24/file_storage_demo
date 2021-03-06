const { StatusCodes } = require('http-status-codes');
const { File } = require('./model');
const { generateKeys, deleteFile } = require('../../utility');

class FileService {
  static async downloadFile(publicKey) {
    try {
      const result = {
        hasError: false,
      };
      const findFilter = {
        publicKey,
        deletedAt: null,
      };

      const file = await File.findOne(findFilter);
      if (!file) {
        result.hasError = true;
        result.statusCode = StatusCodes.NOT_FOUND;
        result.message = "This file doesn't exist";
      }
      result.file = file;
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async createFile(userId, fileParams) {
    try {
      const { publicKey, privateKey } = generateKeys();
      const { mimetype, filename, path } = fileParams;
      const fileInfo = {
        name: filename,
        path,
        mimeType: mimetype,
        publicKey,
        privateKey,
        userId,
      };
      await File.create(fileInfo);
      return {
        publicKey,
        privateKey,
      };
    } catch (err) {
      throw err;
    }
  }

  static async deleteFile(params) {
    try {
      const { privateKey, reqUserId } = params;
      const result = {
        hasError: false,
      };
      const findFilter = { privateKey };
      const updateInfo = {
        deletedAt: new Date(),
      };
      const file = await File.findOneAndUpdate(findFilter, updateInfo);
      if (!file) {
        result.hasError = true;
        result.statusCode = StatusCodes.NOT_FOUND;
        result.message = 'File not Found';
      }
      if (file && file.deletedAt) {
        result.hasError = true;
        result.statusCode = 474;
        result.message = 'This file is already deleted';
      }
      if (file && file.userId.toString() !== reqUserId.toString()) {
        result.hasError = true;
        result.statusCode = StatusCodes.FORBIDDEN;
        result.message = 'You cannot delete this file';
      }
      if (!result.hasError) {
        deleteFile(file.path);
      }
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  FileService,
};
