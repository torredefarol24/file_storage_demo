const path = require("path");
const envOpt = {
  path: path.join(__dirname + "../../../../", ".env"),
};
require("dotenv").config(envOpt);

const {
  // SYSTEM
  PORT,
  FOLDER,
  DONWLOAD_LIMIT,

  // DATABASE
  DB_URL,

  // TOKENS
  JWT_SECRET,
  EXPIRY_TIME,
} = process.env;

const SYSTEM = {
  PORT,
  STORAGE_PATH: FOLDER,
  DONWLOAD_LIMIT,
};

const DB = {
  CONNECTION_URL: DB_URL,
};

const TOKENS = {
  EXPIRY_TIME,
  SECRET_KEY : JWT_SECRET,
};

module.exports = {
  SYSTEM,
  DB,
  TOKENS,
};
