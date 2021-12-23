const { StatusCodes } = require("http-status-codes");
const { handleAppException } = require("../../utility");
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
    return handleAppException(err, response);
  }
}

module.exports = {
  generateUserInfo,
};
