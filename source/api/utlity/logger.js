const currentTS = new Date().toISOString().split("T");
const currentTime = `[${currentTS[0]} ${currentTS[1].split(".")[0]}]`;

function log(message) {
  console.log(`${currentTime} -- ${message}`);
}

function error(message) {
  console.log("\x1b[31m", `${currentTime} -- ERROR -- ${message}`);
}

module.exports = {
  logger: {
    log,
    error,
  },
};
