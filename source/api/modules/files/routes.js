const router = require("express").Router();
const { downloadFile, deleteFile, uploadFile } = require("./controller");
const {
  hasPublicKey,
  hasPrivateKey,
  isAuthorized,
} = require("../../middleware");
const { FileUpload } = require("../../utility");

router.post("/", [isAuthorized, FileUpload.single("file")], uploadFile);
router.get("/:publicKey", hasPublicKey, downloadFile);
router.delete("/:privateKey", [hasPrivateKey, isAuthorized], deleteFile);

module.exports = router;
