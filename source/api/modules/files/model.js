const { MODELS } = require("../../config");
const { Schema, model } = require("mongoose");

const timeStampOpts = {
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
};

const schemaOpts = {
  path: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
  downloadCount: {
    type: String,
    default: 0,
  },
  lastDownloadedAt: {
    type: Date,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: MODELS.USERS,
    author: true,
    required: true,
  },
};

const FileSchema = new Schema(schemaOpts, timeStampOpts);
const File = model(MODELS.FILES, FileSchema);

module.exports = {
  File,
};
