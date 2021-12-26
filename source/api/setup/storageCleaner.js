const { schedule } = require("node-cron");
const { ENV } = require("../config");
const { File } = require("../modules/files/model");
const { logger, deleteFile } = require("../utility");

const EXEC_DAILY = "0 0 0 * * *";

async function cleanupStorage() {
  try {
    const timeLimit =
      new Date().getTime() -
      ENV.SYSTEM.INACTIVE_DAYS_LIMIT * 24 * 60 * 60 * 1000;
    const cleanupDate = new Date(timeLimit);

    const findFilter = {
      lastDownloadedAt: {
        $lte: cleanupDate,
      },
    };
    const updateInfo = {
      $set: {
        deletedAt: new Date(),
      },
    };
    await File.updateMany(findFilter, updateInfo);

    const deleteList = await File.find(findFilter).select("path");
    for (var i = 0; i < deleteList.length; i++) {
      deleteFile(deleteList[i].path);
      logger.log(deleteList[i].path, "File Deleted due to inactivity");
    }
  } catch (err) {
    logger.error(err);
  }
}

const CLEANUP = schedule(EXEC_DAILY, cleanupStorage, { scheduled: true });

module.exports = CLEANUP;
