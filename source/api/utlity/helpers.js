function errorContext(message) {
  return {
    success: false,
    data: null,
    message,
  };
}

function _generateKey(endLimit) {
  return Math.random().toString(36).substring(2, endLimit).toUpperCase();
}

function generateKeys() {
  return {
    publicKey: _generateKey(8),
    privateKey: `${_generateKey(12)}${_generateKey(12)}`,
  };
}

module.exports = {
  errorContext,
  generateKeys,
};
