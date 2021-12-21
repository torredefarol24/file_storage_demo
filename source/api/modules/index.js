const router = require("express").Router();
const { healthRouter } = require("./health");
const { filesRouter } = require("./files");

router.use("/health", healthRouter);
router.use("/files", filesRouter);

module.exports = {
  router,
};
