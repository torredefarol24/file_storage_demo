const currentTS = new Date().toISOString().split("T");
const currentTime = `[${currentTS[0]} ${currentTS[1].split(".")[0]}]`;

function _getMsg(args) {
  var msg = "";
  for (var i of args) {
    msg += ` ${i}`;
  }
  return msg;
}

function log() {
  console.log(`${currentTime} --`, _getMsg(arguments));
}

function error() {
  console.log("\x1b[31m", `${currentTime} -- ERROR --`, _getMsg(arguments));
}

function debug() {
  console.log("\x1b[33m", `${currentTime} -- DEBUG --`, _getMsg(arguments));
}

module.exports = {
  log,
  error,
  debug,
};
