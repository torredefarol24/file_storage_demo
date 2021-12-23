const router = require("express").Router();
const { downloadFile, deleteFile, uploadFile } = require("./controller");
const {
  hasPublicKey,
  hasPrivateKey,
  isAuthorized,
} = require("../../middleware");

router.post("/", isAuthorized, uploadFile);
router.get("/:publicKey", hasPublicKey, downloadFile);
router.delete("/:privateKey", [hasPrivateKey, isAuthorized], deleteFile);

module.exports = router;
