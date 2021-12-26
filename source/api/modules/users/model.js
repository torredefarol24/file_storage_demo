const { Schema, model } = require('mongoose');
const { MODELS } = require('../../config');

const timeStampOpts = {
  timestamps: {
    createdAt: 'createdAt',
  },
};

const schemaOpts = {
  username: {
    type: String,
    required: true,
  },
};

const UserSchema = new Schema(schemaOpts, timeStampOpts);
const User = model(MODELS.USERS, UserSchema);

module.exports = {
  User,
};
