const multer = require('multer');
const { ENV } = require('../config');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, ENV.SYSTEM.STORAGE_PATH);
  },
  filename(req, file, cb) {
    let ogFileName = file.originalname.split('.');
    ogFileName = ogFileName[ogFileName.length - 1];
    const fileName = `${new Date().getTime()}.${ogFileName}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
