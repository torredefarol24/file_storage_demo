const { StatusCodes } = require("http-status-codes");
const logger = require("./logger");
const { ENV, TRANSFER_TYPES } = require("../config");

const DL_LIMIT = parseInt(ENV.SYSTEM.DAILY_DOWNLOAD_LIMIT);
const UP_LIMIT = parseInt(ENV.SYSTEM.DAILY_UPLOAD_LIMIT);

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

function reachedTransferLimit(list, transferType) {
  const limit = transferType === TRANSFER_TYPES.DOWNLOAD ? DL_LIMIT : UP_LIMIT;
  var todaysTransferCount = 0;

  for (var i = 0; i < list.length; i++) {
    if (isToday(list[i].createdAt)) {
      todaysTransferCount++;
    }

    if (todaysTransferCount >= limit) {
      break;
    }
  }

  return todaysTransferCount >= limit;
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
