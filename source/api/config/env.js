const path = require("path");
const envOpt = {
  path: path.join(__dirname + "../../../../", ".env"),
};
require("dotenv").config(envOpt);

// export const DB_CONF = {
//   NAME: process.env.DB_NAME,
//   HOST: process.env.DB_HOST,
//   PORT: Number(process.env.DB_PORT),
//   USER: process.env.DB_USER,
//   PASS: process.env.DB_PASS,
// };

const SYSTEM = {
  PORT: process.env.PORT,
  FOLDER: process.env.FOLDER,
};

module.exports = {
  SYSTEM,
};
