const { StatusCodes } = require("http-status-codes");
const { handleAppError, handleAppException } = require("../../utility");
const { FileService } = require("./service");
const { TrafficService } = require("../traffic");

async function downloadFile(request, response) {
  try {
    let context = {
      success: true,
      message: "File Download successful",
      data: {},
    };

    const fileInfo = await FileService.downloadFile(request.params.publicKey);
    const { file } = fileInfo;
    if (fileInfo.hasError) {
      return handleAppError(fileInfo, response);
    }

    const trafficParams = {
      fileId: file.id,
      ipAddress: request.connection.remoteAddress,
    };
    const limitInfo = await TrafficService.checkLimit(trafficParams);
    if (limitInfo.hasError) {
      return handleAppError(limitInfo, response);
    }

    context.data = file.name;
    return response.status(StatusCodes.OK).json(context);
  } catch (err) {
    return handleAppException(err, response);
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
    return handleAppException(err, response);
  }
}

async function deleteFile(request, response) {
  try {
    let context = {
      success: true,
      message: "File Deleted",
      data: {},
    };

    const deleteParams = {
      privateKey: request.params.privateKey,
      reqUserId: request.user.id,
    };
    const deleteFileInfo = await FileService.deleteFile(deleteParams);
    if (deleteFileInfo.hasError) {
      return handleAppError(deleteFileInfo, response);
    }

    return response.status(StatusCodes.OK).json(context);
  } catch (err) {
    return handleAppException(err, response);
  }
}

module.exports = {
  downloadFile,
  uploadFile,
  deleteFile,
};
