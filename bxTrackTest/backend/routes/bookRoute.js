const express = require('express');

const {getAllBook, createBook, updateBook, deleteBook} = require ('../controller/bookController')

const router = express.Router();

router.route('/books').get(getAllBook)
router.route('/book/new').post(createBook)
router.route('/book/:id').put(updateBook).delete(deleteBook)

module.exports = router