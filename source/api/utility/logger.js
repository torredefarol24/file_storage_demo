const { ENV } = require('../config');

const currentTS = new Date().toISOString().split('T');
const currentTime = `[${currentTS[0]} ${currentTS[1].split('.')[0]}]`;

function _getMsg(args) {
  let msg = '';
  for (const i of args) {
    msg += ` ${i}`;
  }
  return msg;
}

function log() {
  ENV.SYSTEM.LAUNCH_MODE !== 'test'
    && console.log(`${currentTime} --`, _getMsg(arguments));
}

function error() {
  ENV.SYSTEM.LAUNCH_MODE !== 'test'
    && console.log('\x1b[31m', `${currentTime} -- ERROR --`, _getMsg(arguments));
}

function debug() {
  ENV.SYSTEM.LAUNCH_MODE !== 'test'
    && console.log('\x1b[33m', `${currentTime} -- DEBUG --`, _getMsg(arguments));
}

module.exports = {
  log,
  error,
  debug,
};
