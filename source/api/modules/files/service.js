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
}

module.exports = {
  FileService,
};
