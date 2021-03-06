const { Schema, model } = require('mongoose');
const { MODELS } = require('../../config');

const timeStampOpts = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
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
  mimeType: {
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
  deletedAt: {
    type: Date,
    default: null,
  },
  lastDownloadedAt: {
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
