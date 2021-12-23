const { logger, errorContext } = require("../utlity");
const { StatusCodes } = require("http-status-codes");
const { TokenService } = require("../utlity");

async function isAuthorized(request, response, next) {
  try {
    let bearerToken = request.headers && request.headers.authorization;
    if (!bearerToken) {
      logger.error("Token Missing");
      return response
        .status(StatusCodes.UNAUTHORIZED)
        .json(errorContext("Token Missing"));
    }
    const authToken = bearerToken.split(" ")[1];
    const decodedToken = await TokenService.verifyToken(authToken);
    request.user = {
      id: decodedToken.userId,
    };
    next();
  } catch (err) {
    return response
      .status(StatusCodes.FORBIDDEN)
      .json(errorContext(err.message));
  }
}

module.exports = {
  isAuthorized,
};
