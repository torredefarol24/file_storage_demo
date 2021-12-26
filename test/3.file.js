const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { readFileSync } = require("fs");
const { StatusCodes } = require("http-status-codes");

chai.use(chaiHttp);

const { BASE_URL, CREATE_USER_URL, FILE_URL } = require("./_testConfig");

describe("Upload Files", function () {
  it("should fail upload without user token", async function () {
    const resp = await chai.request(BASE_URL).post(FILE_URL);
    assert.equal(resp.statusCode, StatusCodes.UNAUTHORIZED);
  });

  it("should create and upload files", async function () {
    const userResp = await chai.request(BASE_URL).post(CREATE_USER_URL);
    const uploadResp = await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set("Content-Type", "image/jpg")
      .set("Authorization", `Bearer ${userResp.body.data.token}`)
      .attach("file", readFileSync("./test/_testImg.jpg"), "demo.jpg");
    assert.equal(uploadResp.statusCode, StatusCodes.OK);
  });
});

describe("Download Files", function () {
  it("should download existing files", async function () {
    const userResp = await chai.request(BASE_URL).post(CREATE_USER_URL);
    const uploadResp = await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set("Content-Type", "image/jpg")
      .set("Authorization", `Bearer ${userResp.body.data.token}`)
      .attach("file", readFileSync("./test/_testImg.jpg"), "demo.jpg");

    const downloadUrl = `${FILE_URL}/${uploadResp.body.data.publicKey}`;
    const downloadResp = await chai.request(BASE_URL).get(downloadUrl);
    assert.equal(downloadResp.statusCode, StatusCodes.OK);
  });

  it("should fail download without publicKey", async function () {
    const resp = await chai.request(BASE_URL).get(FILE_URL);
    assert.equal(resp.statusCode, StatusCodes.NOT_FOUND);
  });

  it("should fail to download non-existing files", async function () {
    const downloadUrl = `${FILE_URL}/${Math.random()
      .toString(36)
      .substring(2, 4)}`;
    const downloadResp = await chai.request(BASE_URL).get(downloadUrl);
    assert.equal(downloadResp.statusCode, StatusCodes.NOT_FOUND);
  });
});

describe("Delete Files", function () {
  it("should fail delete without user token", async function () {
    const deleteUrl = `${FILE_URL}/${Math.random()
      .toString(36)
      .substring(2, 4)}`;
    const resp = await chai.request(BASE_URL).delete(deleteUrl);
    assert.equal(resp.statusCode, StatusCodes.UNAUTHORIZED);
  });

  it("should fail delete without privateKey", async function () {
    const resp = await chai.request(BASE_URL).delete(FILE_URL);
    assert.equal(resp.statusCode, StatusCodes.NOT_FOUND);
  });

  it("should fail to delete non-existing files", async function () {
    const deleteUrl = `${FILE_URL}/${Math.random()
      .toString(36)
      .substring(2, 4)}`;
    const deleteResp = await chai.request(BASE_URL).get(deleteUrl);
    assert.equal(deleteResp.statusCode, StatusCodes.NOT_FOUND);
  });

  it("should not delete another user's file through any token", async function () {
    const userResp = await chai.request(BASE_URL).post(CREATE_USER_URL);
    const copyUserResp = await chai.request(BASE_URL).post(CREATE_USER_URL);

    const uploadResp = await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set("Content-Type", "image/jpg")
      .set("Authorization", `Bearer ${userResp.body.data.token}`)
      .attach("file", readFileSync("./test/_testImg.jpg"), "demo.jpg");

    const deleteUrl = `${FILE_URL}/${uploadResp.body.data.privateKey}`;
    const deleteResp = await chai
      .request(BASE_URL)
      .delete(deleteUrl)
      .set("Authorization", `Bearer ${copyUserResp.body.data.token}`);
    assert.equal(deleteResp.statusCode, StatusCodes.FORBIDDEN);
  });

  it("should delete owner's file", async function () {
    const userResp = await chai.request(BASE_URL).post(CREATE_USER_URL);
    const uploadResp = await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set("Content-Type", "image/jpg")
      .set("Authorization", `Bearer ${userResp.body.data.token}`)
      .attach("file", readFileSync("./test/_testImg.jpg"), "demo.jpg");

    const deleteUrl = `${FILE_URL}/${uploadResp.body.data.privateKey}`;
    const deleteResp = await chai
      .request(BASE_URL)
      .delete(deleteUrl)
      .set("Authorization", `Bearer ${userResp.body.data.token}`);
    assert.equal(deleteResp.statusCode, StatusCodes.OK);
  });

  it("should not delete already deleted file", async function () {
    const userResp = await chai.request(BASE_URL).post(CREATE_USER_URL);
    const uploadResp = await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set("Content-Type", "image/jpg")
      .set("Authorization", `Bearer ${userResp.body.data.token}`)
      .attach("file", readFileSync("./test/_testImg.jpg"), "demo.jpg");

    const deleteUrl = `${FILE_URL}/${uploadResp.body.data.privateKey}`;
    const deleteResp = await chai
      .request(BASE_URL)
      .delete(deleteUrl)
      .set("Authorization", `Bearer ${userResp.body.data.token}`);
    const retryDeleteResp = await chai
      .request(BASE_URL)
      .delete(deleteUrl)
      .set("Authorization", `Bearer ${userResp.body.data.token}`);
    assert.equal(retryDeleteResp.statusCode, 474);
  });
});
