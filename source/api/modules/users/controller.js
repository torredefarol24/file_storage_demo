const { StatusCodes } = require("http-status-codes");
const { logger, errorContext } = require("../../utlity");
const { UserService } = require("./service");

async function generateUserInfo(request, response) {
  try {
    let context = {
      success: true,
      message: "User Created",
      data: {},
    };

    const { token, username } = await UserService.createUser();
    context.data = {
      token,
      username,
    };
    return response.status(StatusCodes.OK).json(context);
  } catch (err) {
    logger.error(err);
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorContext(err.message));
  }
}

module.exports = {
  generateUserInfo,
};
