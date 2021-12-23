const bodyParser = require("body-parser");
const cors = require("cors");
const { router } = require("../modules");
const { connect } = require("mongoose");
const { logger } = require("../utlity");
const { ENV } = require("../config");

async function connectToDB() {
  try {
    await connect(ENV.DB.CONNECTION_URL);
    logger.log("Connected to DB");
  } catch (err) {
    logger.err(err);
  }
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
};
