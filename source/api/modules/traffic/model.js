const { MODELS } = require("../../config");
const { Schema, model } = require("mongoose");

const timeStampOpts = {
  timestamps: {
    createdAt: "createdAt",
  },
};

const schemaOpts = {
  fileId: {
    type: Schema.Types.ObjectId,
    ref: MODELS.FILES,
    author: true,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
};

const TrafficSchema = new Schema(schemaOpts, timeStampOpts);
const Traffic = model(MODELS.TRAFFIC, TrafficSchema);

module.exports = {
  Traffic,
};
