const express = require("express");
const { logger } = require("../utility");
const { ENV } = require("../config");
const { bootstrapApp } = require("./bootstrap");
const { connectToDB, createStorageDir, cleanupStorage } = require("../setup");

class FileSharingService {
  #app;
  constructor() {
    this.#app = express();
    this.#startHttpServer(this.#app);
    this.#setupApp(this.#app);
    this.#connectToDatabase();
    this.#createStorageDirectory();
    this.#cleanupUnusedFiles();
  }

  #startHttpServer(app) {
    const listenCB = logger.log(`Server Listening on port:`, ENV.SYSTEM.PORT);
    app.listen(ENV.SYSTEM.PORT, listenCB);
  }

  #setupApp(app) {
    bootstrapApp(app);
  }

  #connectToDatabase() {
    connectToDB();
  }

  #createStorageDirectory() {
    createStorageDir();
  }

  #cleanupUnusedFiles() {
    cleanupStorage;
  }
}

module.exports = {
  FileSharingService,
};
