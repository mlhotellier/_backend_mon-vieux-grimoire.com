const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/book')

router.get('/', bookCtrl.getAllBook);
router.get('/:id', bookCtrl.getOneBook);
router.get('/bestrating', bookCtrl.getBestBook);
router.post('/', bookCtrl.createBook);
router.put('/:id', bookCtrl.modifyBook);
router.delete('/:id', bookCtrl.deleteBook);
router.post('/:id/rating', bookCtrl.createRatingBook);

module.exports = router;