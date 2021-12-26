const { mkdirSync, existsSync } = require("fs");
const { logger } = require("../utility");
const { ENV } = require("../config");

function createStorageDir() {
  const storagePath = ENV.SYSTEM.STORAGE_PATH;
  if (existsSync(storagePath)) {
    logger.log("Storage Path Found", storagePath);
    return;
  }

  mkdirSync(storagePath);
  logger.log("Storage Path set to", storagePath);
}

module.exports = createStorageDir;
