const express = require("express");
const { logger } = require("../utility");
const { ENV } = require("../config");
const { bootstrapApp, connectToDB } = require("./bootstrap");

class FileSharingService {
  #app;
  constructor() {
    this.#app = express();
    this.#startHttpServer(this.#app);
    this.#setupApp(this.#app);
    this.#connectToDatabase();
  }

  #startHttpServer(app) {
    const listenCB = logger.log(`Server Listening on port: ${ENV.SYSTEM.PORT}`);
    app.listen(ENV.SYSTEM.PORT, listenCB);
  }

  #setupApp(app) {
    bootstrapApp(app);
  }

  #connectToDatabase() {
    connectToDB();
  }
}

module.exports = {
  FileSharingService,
};
