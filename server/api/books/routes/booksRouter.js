const handler = require('../handler/books');
const router = require('express').Router();
const handlerResponse = require('../../../utils/common-helpers').handlerResponse;

router.get('/books', handlerResponse(handler.getAllBooks));
router.get('/book/:id', handlerResponse(handler.getBookById));
module.exports = router;
