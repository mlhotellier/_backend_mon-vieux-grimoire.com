const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  // 'image/webp': 'webp',
};

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (MIME_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Le type du fichier est incorrect'), false);
  }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter }).single('image');