const express = require("express");
const { logger } = require("../utlity/logger");
const { SYSTEM } = require("../config/env");
const { bootstrapApp } = require("./bootstrap");

class FileSharingService {
  #app;
  constructor() {
    this.#app = express();
    this.startHttpServer(this.#app);
    this.setupApp(this.#app);
  }

  startHttpServer(app) {
    const listenCB = logger.log(`Server Listenting on port: ${SYSTEM.PORT}`);
    app.listen(SYSTEM.PORT, listenCB);
  }

  setupApp(app) {
    bootstrapApp(app);
  }
}

module.exports = {
  FileSharingService,
};
