const router = require("express").Router();
const { healthRouter } = require("./health");
const { filesRouter } = require("./files");
const { userRouter } = require("./users");

router.use("/health", healthRouter);
router.use("/files", filesRouter);
router.use("/users", userRouter);

module.exports = {
  router,
};
