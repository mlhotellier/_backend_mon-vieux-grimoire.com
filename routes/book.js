const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const { getAllBook, getBestBooks, getOneBook, createBook, modifyBook, deleteBook, createRatingBook } = require('../controllers/book')

router.get('/bestrating', getBestBooks);
router.get('/:id', getOneBook);
router.get('/', getAllBook);
router.post('/', auth, multer, createBook);
router.put('/:id', auth, multer, modifyBook);
router.delete('/:id', auth, deleteBook);
router.post('/:id/rating', auth, createRatingBook);

module.exports = router;