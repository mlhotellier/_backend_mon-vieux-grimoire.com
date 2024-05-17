const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const bookCtrl = require('../controllers/book')

router.get('/', bookCtrl.getAllBook);
router.get('/:id', bookCtrl.getOneBook);
router.get('/bestrating', bookCtrl.getBestBook);
router.post('/', auth, multer, bookCtrl.createBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.createRatingBook);

module.exports = router;