const { connect } = require('mongoose');
const { logger } = require('../utility');
const { ENV } = require('../config');

async function connectToDB() {
  try {
    await connect(ENV.DB.CONNECTION_URL);
    logger.log('Connected to DB');
  } catch (err) {
    logger.error(err);
  }
}

module.exports = connectToDB;
