const express = require('express');
const { bootstrapApp } = require('./bootstrap');
const { connectToDB, createStorageDir } = require('../setup');

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
