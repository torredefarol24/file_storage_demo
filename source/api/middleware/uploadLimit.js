const { StatusCodes } = require("http-status-codes");
const { TrafficService } = require("../modules/traffic");
const { handleAppError } = require("../utility");

const errParams = {
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  message: "Something went wrong",
};

async function isUploadLimitReached(request, response, next) {
  try {
    const limitInfo = await TrafficService.checkUploadLimit(request.user.id);
    if (limitInfo.hasError) {
      return handleAppError(limitInfo, response);
    }
    next();
  } catch (err) {
    return handleAppError(errParams, response);
  }
}

module.exports = {
  isUploadLimitReached,
};
