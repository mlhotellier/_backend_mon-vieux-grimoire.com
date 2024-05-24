const multer = require('multer');

// Define allowed MIME types and their corresponding file extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (MIME_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Le type du fichier est incorrect'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter 
}).single('image');

module.exports = upload;