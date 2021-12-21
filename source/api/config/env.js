const path = require("path");
const envOpt = {
  path: path.join(__dirname + "../../../../", ".env"),
};
require("dotenv").config(envOpt);

const SYSTEM = {
  PORT: process.env.PORT,
  STORAGE_PATH: process.env.FOLDER,
};

module.exports = {
  SYSTEM,
};
