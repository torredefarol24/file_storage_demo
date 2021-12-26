const { StatusCodes } = require('http-status-codes');
const { handleAppError } = require('../utility');

const errParams = {
  statusCode: StatusCodes.BAD_REQUEST,
  message: 'Params Missing',
};

function hasPublicKey(request, response, next) {
  if (!request.params.publicKey) {
    return handleAppError(errParams, response);
  }
  next();
}

function hasPrivateKey(request, response, next) {
  if (!request.params.privateKey) {
    return handleAppError(errParams, response);
  }
  next();
}

module.exports = {
  hasPublicKey,
  hasPrivateKey,
};
