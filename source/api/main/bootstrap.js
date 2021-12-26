const bodyParser = require('body-parser');
const cors = require('cors');
const { router } = require('../modules');

function bootstrapApp(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use('/api/v1', router);
}

module.exports = {
  bootstrapApp,
};
