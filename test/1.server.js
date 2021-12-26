const assert = require("assert");
const { StagingService } = require("../source/api/main");
const { PORT } = require("./_testConfig");

describe("Run Staging Server", () => {
  const mockServer = new StagingService();
  const listener = mockServer.startMockServer(PORT);
  const listenerPort = listener.address().port;

  it(`should start server on port ${PORT}`, () => {
    assert.equal(listenerPort, PORT);
  });
});
