const { join } = require("path");
const { config } = require("dotenv");

const envOpt = {
  path: join(__dirname + "../../../../", ".env"),
};

config(envOpt);

const {
  // --- SYSTEM ---
  PORT,
  FOLDER,
  DAILY_DOWNLOAD_LIMIT,
  DAILY_UPLOAD_LIMIT,
  INACTIVE_DAYS_LIMIT,
  LAUNCH_MODE,
  // --- DATABASE ---
  DB_CONN_URL,

  // --- TOKENS ---
  JWT_SECRET,
  JWT_EXPIRY_TIME,
} = process.env;

const SYSTEM = {
  PORT,
  STORAGE_PATH: FOLDER,
  LAUNCH_MODE,
};

const TRAFFIC = {
  DAILY_DOWNLOAD_LIMIT: LAUNCH_MODE === "test" ? 2 : DAILY_DOWNLOAD_LIMIT,
  DAILY_UPLOAD_LIMIT: LAUNCH_MODE === "test" ? 2 : DAILY_UPLOAD_LIMIT,
  INACTIVE_DAYS_LIMIT,
};

const DB = {
  CONNECTION_URL: DB_CONN_URL,
};

const TOKENS = {
  EXPIRY_TIME: JWT_EXPIRY_TIME,
  SECRET_KEY: JWT_SECRET,
};

module.exports = {
  SYSTEM,
  DB,
  TOKENS,
  TRAFFIC,
};
