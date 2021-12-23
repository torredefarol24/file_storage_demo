const { StatusCodes } = require("http-status-codes");
const { logger, errorContext } = require("../../utlity");
const { FileService } = require("./service");

async function downloadFile(request, response) {
  try {
    const context = {
      success: true,
      message: "Health OK!",
      data: {
        publicKey: "",
        privateKey: "",
      },
    };
    return response.status(StatusCodes.OK).json(context);
  } catch (err) {
    logger.error(err);
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorContext(err.message));
  }
}

async function uploadFile(request, response) {
  try {
    let context = {
      success: true,
      message: "File Stored",
      data: {},
    };

    const { publicKey, privateKey } = await FileService.createFile(
      request.user.id
    );
    context.data = {
      publicKey,
      privateKey,
    };
    return response.status(StatusCodes.OK).json(context);
  } catch (err) {
    logger.error(err);
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorContext(err.message));
  }
}

async function deleteFile(request, response) {
  try {
    let context = {
      success: true,
      message: "File Deleted",
      data: {},
    };
    const { hasError, statusCode, message } = await FileService.deleteFile(
      request.params.privateKey
    );
    if (hasError) {
      logger.error(message);
      return response.status(statusCode).json(errorContext(message));
    }
    return response.status(StatusCodes.OK).json(context);
  } catch (err) {
    logger.error(err);
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorContext(err.message));
  }
}

module.exports = {
  downloadFile,
  uploadFile,
  deleteFile,
};
