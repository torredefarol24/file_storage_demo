const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { readFileSync } = require('fs');

chai.use(chaiHttp);

const { BASE_URL, CREATE_USER_URL, FILE_URL } = require('./_testConfig');

describe('Traffic', () => {
  it('should prevent from downloading after exceeding the limit', async () => {
    const userResp = await chai.request(BASE_URL).post(CREATE_USER_URL);
    const uploadResp = await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set('Content-Type', 'image/jpg')
      .set('Authorization', `Bearer ${userResp.body.data.token}`)
      .attach('file', readFileSync('./test/_testImg.jpg'), 'demo.jpg');

    const downloadUrl = `${FILE_URL}/${uploadResp.body.data.publicKey}`;
    await chai.request(BASE_URL).get(downloadUrl);
    await chai.request(BASE_URL).get(downloadUrl);
    const downloadResp = await chai.request(BASE_URL).get(downloadUrl);
    assert.equal(downloadResp.statusCode, 468);
  });

  it('should prevent from uploading after exceeding the limit', async () => {
    const userResp = await chai.request(BASE_URL).post(CREATE_USER_URL);
    await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set('Content-Type', 'image/jpg')
      .set('Authorization', `Bearer ${userResp.body.data.token}`)
      .attach('file', readFileSync('./test/_testImg.jpg'), 'demo.jpg');
    await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set('Content-Type', 'image/jpg')
      .set('Authorization', `Bearer ${userResp.body.data.token}`)
      .attach('file', readFileSync('./test/_testImg.jpg'), 'demo.jpg');
    const uploadResp = await chai
      .request(BASE_URL)
      .post(FILE_URL)
      .set('Content-Type', 'image/jpg')
      .set('Authorization', `Bearer ${userResp.body.data.token}`)
      .attach('file', readFileSync('./test/_testImg.jpg'), 'demo.jpg');

    assert.equal(uploadResp.statusCode, 478);
  });
});
