const { sign, verify } = require('jsonwebtoken');
const { ENV } = require('../config');

const { SECRET_KEY, EXPIRY_TIME } = ENV.TOKENS;
const logger = require('./logger');

async function signToken(userId) {
  try {
    const signedToken = await sign({ userId }, SECRET_KEY, {
      expiresIn: EXPIRY_TIME,
    });
    return signedToken;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

async function verifyToken(token) {
  try {
    return await verify(token, SECRET_KEY);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

module.exports = { signToken, verifyToken };
