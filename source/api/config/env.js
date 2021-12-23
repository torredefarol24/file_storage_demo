const path = require("path");
const envOpt = {
  path: path.join(__dirname + "../../../../", ".env"),
};
require("dotenv").config(envOpt);

const SYSTEM = {
  PORT: process.env.PORT,
  STORAGE_PATH: process.env.FOLDER,
};

const DB = {
  CONNECTION_URL: process.env.DB_URL,
};

const TOKENS = {
  TOKEN_EXPIRY_TIME: "30d",
  SECRET_KEY : process.env.JWT_SECRET
}

module.exports = {
  SYSTEM,
  DB,
  TOKENS
};
