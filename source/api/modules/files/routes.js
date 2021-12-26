const router = require("express").Router();
const { downloadFile, deleteFile, uploadFile } = require("./controller");
const {
  hasPublicKey,
  hasPrivateKey,
  isAuthorized,
  isUploadLimitReached,
} = require("../../middleware");
const { FileUpload } = require("../../setup");

router.post(
  "/",
  [isAuthorized, isUploadLimitReached, FileUpload.single("file")],
  uploadFile
);
router.get("/:publicKey", hasPublicKey, downloadFile);
router.delete("/:privateKey", [isAuthorized, hasPrivateKey], deleteFile);

module.exports = router;
