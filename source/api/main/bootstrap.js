const bodyParser = require("body-parser");
const cors = require("cors");

function bootstrapApp(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
}

module.exports = {
  bootstrapApp,
};
