const { hasPublicKey, hasPrivateKey } = require("./hasKeys");
const { isAuthorized } = require("./tokens");
const { isUploadLimitReached } = require("./uploadLimit");

module.exports = {
  hasPublicKey,
  hasPrivateKey,
  isAuthorized,
  isUploadLimitReached,
};
