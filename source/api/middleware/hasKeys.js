const { logger, errorContext } = require("../utlity");
const { StatusCodes } = require("http-status-codes");

function hasPublicKey(request, response, next) {
  if (!request.params.publicKey) {
    logger.error("Params Missing");
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json(errorContext("Params Missing"));
  }
  next();
}

function hasPrivateKey(request, response, next) {
  if (!request.params.privateKey) {
    logger.error("Params Missing");
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json(errorContext("Params Missing"));
  }
  next();
}

module.exports = {
  hasPublicKey,
  hasPrivateKey,
};
