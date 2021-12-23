const { handleAppError } = require("../utility");
const { StatusCodes } = require("http-status-codes");
const { TokenService } = require("../utility");

const errParams = {
  statusCode: StatusCodes.UNAUTHORIZED,
  message: "Bad Token",
};

async function isAuthorized(request, response, next) {
  try {
    let bearerToken = request.headers && request.headers.authorization;
    if (!bearerToken) {
      return handleAppError(errParams, response);
    }
    const authToken = bearerToken.split(" ")[1];
    const decodedToken = await TokenService.verifyToken(authToken);
    request.user = {
      id: decodedToken.userId,
    };
    next();
  } catch (err) {
    return handleAppError(errParams, response);
  }
}

module.exports = {
  isAuthorized,
};
