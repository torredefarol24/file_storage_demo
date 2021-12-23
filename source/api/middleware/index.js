const { hasPublicKey, hasPrivateKey } = require("./hasKeys");
const { isAuthorized } = require('./tokens');

module.exports = {
  hasPublicKey,
  hasPrivateKey,
  isAuthorized
};
