const router = require("express").Router();
const { generateUserInfo } = require("./controller");

router.post("/", generateUserInfo);

module.exports = router;
