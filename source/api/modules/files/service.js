const { File } = require("./model");
const { generateKeys } = require("../../utility");

class FileService {
  static async downloadFile(publicKey) {
    try {
      var result = {
        hasError: false,
      };
      const findFilter = {
        publicKey,
        deletedAt: null,
      };

      const file = await File.findOne(findFilter);
      if (!file) {
        result.hasError = true;
        result.statusCode = 404;
        result.message = "This file doesn't exist";
      }
      result.file = file;
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async createFile(userId) {
    try {
      const { publicKey, privateKey } = generateKeys();
      const fileInfo = {
        name: "testName",
        path: "testPath",
        publicKey,
        privateKey,
        userId,
      };
      const file = await File.create(fileInfo);
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
      var result = {
        hasError: false,
      };
      const findFilter = { privateKey };
      const updateInfo = {
        deletedAt: new Date(),
      };
      const file = await File.findOneAndUpdate(findFilter, updateInfo);
      if (file.deletedAt) {
        result.hasError = true;
        result.statusCode = 474;
        result.message = "This file is already deleted";
      }
      if (!file) {
        result.hasError = true;
        result.statusCode = 404;
        result.message = "File not Found";
      }
      if (file.userId.toString() !== reqUserId.toString()) {
        result.hasError = true;
        result.statusCode = 403;
        result.message = "You cannot delete this file";
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
