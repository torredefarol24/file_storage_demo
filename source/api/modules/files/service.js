const { File } = require("./model");
const { generateKeys } = require("../../utlity");

class FileService {
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

  static async deleteFile(privateKey) {
    try {
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
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  FileService,
};
