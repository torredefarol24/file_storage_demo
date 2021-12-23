const { MODELS } = require("../../config");
const { Schema, model } = require("mongoose");

const timeStampOpts = {
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
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
