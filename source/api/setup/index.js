module.exports = {
  connectToDB: require('./db'),
  FileUpload: require('./fileUploads'),
  createStorageDir: require('./diskStorage'),
  cleanupStorage: require('./storageCleaner'),
};
