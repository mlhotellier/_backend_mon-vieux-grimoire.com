const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const newFile = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    const newName = newFile.split('.'+extension);
    const name = newName[0];
    console.log(extension)
    callback(null, Date.now() + '_' + name + '.' + extension);
  }
});

module.exports = multer({ storage: storage }).single('image');