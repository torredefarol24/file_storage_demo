const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { readFileSync } = require("fs");
const { StatusCodes } = require("http-status-codes");

chai.use(chaiHttp);

const { BASE_URL, CREATE_USER_URL, FILE_URL } = require("./_testConfig");

describe("Traffic", function () {
  it("should prevent from downloading after exceeding the limit", async function () {
    const userResp = await chai.request(BASE_URL).post(CREATE_USER_URL);
    const uploadResp = await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set("Content-Type", "image/jpg")
      .set("Authorization", `Bearer ${userResp.body.data.token}`)
      .attach("file", readFileSync("./test/_testImg.jpg"), "demo.jpg");

    const downloadUrl = `${FILE_URL}/${uploadResp.body.data.publicKey}`;
    const downloadResp1 = await chai.request(BASE_URL).get(downloadUrl);
    const downloadResp2 = await chai.request(BASE_URL).get(downloadUrl);
    const downloadResp3 = await chai.request(BASE_URL).get(downloadUrl);

    assert.equal(downloadResp3.statusCode, 468);
  });

  it("should prevent from uploading after exceeding the limit", async function () {
    const userResp = await chai.request(BASE_URL).post(CREATE_USER_URL);
    const uploadResp1 = await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set("Content-Type", "image/jpg")
      .set("Authorization", `Bearer ${userResp.body.data.token}`)
      .attach("file", readFileSync("./test/_testImg.jpg"), "demo.jpg");
    const uploadResp2 = await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set("Content-Type", "image/jpg")
      .set("Authorization", `Bearer ${userResp.body.data.token}`)
      .attach("file", readFileSync("./test/_testImg.jpg"), "demo.jpg");
    const uploadResp3 = await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set("Content-Type", "image/jpg")
      .set("Authorization", `Bearer ${userResp.body.data.token}`)
      .attach("file", readFileSync("./test/_testImg.jpg"), "demo.jpg");

    assert.equal(uploadResp3.statusCode, 478);
  });
});
