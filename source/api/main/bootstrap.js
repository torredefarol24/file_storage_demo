const bodyParser = require("body-parser");
const cors = require("cors");
const { connect } = require("mongoose");
const { mkdirSync, existsSync } = require("fs");
const { router } = require("../modules");
const { logger } = require("../utility");
const { ENV } = require("../config");

async function connectToDB() {
  try {
    await connect(ENV.DB.CONNECTION_URL);
    logger.log("Connected to DB");
  } catch (err) {
    logger.err(err);
  }
}

function createStorageDir() {
  const storagePath = ENV.SYSTEM.STORAGE_PATH;
  if (existsSync(storagePath)) {
    logger.log("Storage Path Found", storagePath);
    return;
  }

  mkdirSync(storagePath);
  logger.log("Storage Path set to", storagePath);
}

function bootstrapApp(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use("/api/v1", router);
}

module.exports = {
  bootstrapApp,
  connectToDB,
  createStorageDir,
};
