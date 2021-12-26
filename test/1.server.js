const assert = require("assert");
const { StagingService } = require("../source/api/main");
const { PORT } = require("./_testConfig");

describe("Run Staging Server", function () {
  const mockServer = new StagingService();
  const listener = mockServer.startMockServer(PORT);
  const listenerPort = listener.address().port;

  it(`should start server on port ${PORT}`, function () {
    assert.equal(listenerPort, PORT);
  });

  // it(`should stop`, function () {
  //   process.exit(0);
  // });
});
