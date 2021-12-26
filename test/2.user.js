const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { StatusCodes } = require("http-status-codes");

chai.use(chaiHttp);

const { BASE_URL, CREATE_USER_URL } = require("./_testConfig");

describe("Users", function () {
  it("should create user", async function () {
    const resp = await chai.request(BASE_URL).post(CREATE_USER_URL);
    assert.equal(resp.statusCode, StatusCodes.OK);
  });
});
