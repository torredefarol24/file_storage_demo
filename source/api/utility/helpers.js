const { StatusCodes } = require("http-status-codes");
const logger = require("./logger");
const { ENV } = require("../config");
const TRANSFER_LIMIT = parseInt(ENV.SYSTEM.DOWNLOAD_LIMIT);

function _errorContext(message) {
  return {
    success: false,
    data: null,
    message,
  };
}

function _generateKey(endLimit) {
  return Math.random().toString(36).substring(2, endLimit).toUpperCase();
}

function generateKeys() {
  return {
    publicKey: _generateKey(8),
    privateKey: `${_generateKey(12)}${_generateKey(12)}`,
  };
}

function isToday(ts) {
  return new Date(ts).toDateString() === new Date().toDateString();
}

function reachedTransferLimit(traffic) {
  var todaysTransferCount = 0;

  for (var i = 0; i < traffic.length; i++) {
    if (isToday(traffic[i].createdAt)) {
      todaysTransferCount++;
    }

    if (todaysTransferCount >= TRANSFER_LIMIT) {
      break;
    }
  }

  return todaysTransferCount >= TRANSFER_LIMIT;
}

function handleAppError(params, response) {
  logger.error(params.message);
  return response.status(params.statusCode).json(_errorContext(params.message));
}

function handleAppException(err, response) {
  logger.error(err);
  return response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(_errorContext(err.message));
}

module.exports = {
  handleAppError,
  handleAppException,
  generateKeys,
  reachedTransferLimit,
};
