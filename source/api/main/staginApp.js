const express = require("express");
const { logger } = require("../utility");
const { ENV } = require("../config");
const { bootstrapApp } = require("./bootstrap");
const { connectToDB, createStorageDir, cleanupStorage } = require("../setup");

class StagingService {
  #stagingApp;

  constructor() {
    this.#stagingApp = express();
    this.#setupApp(this.#stagingApp);
    this.#connectToDatabase();
    this.#createStorageDirectory();
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

  startMockServer(port) {
    return this.#stagingApp.listen(port);
  }
}

module.exports = StagingService;
