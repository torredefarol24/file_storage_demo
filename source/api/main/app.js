const express = require("express");
const { logger } = require("../utlity");
const { ENV } = require("../config");
const { bootstrapApp } = require("./bootstrap");

class FileSharingService {
  #app;
  constructor() {
    this.#app = express();
    this.#startHttpServer(this.#app);
    this.#setupApp(this.#app);
  }

  #startHttpServer(app) {
    const listenCB = logger.log(`Server Listening on port: ${ENV.SYSTEM.PORT}`);
    app.listen(ENV.SYSTEM.PORT, listenCB);
  }

  #setupApp(app) {
    bootstrapApp(app);
  }
}

module.exports = {
  FileSharingService,
};
