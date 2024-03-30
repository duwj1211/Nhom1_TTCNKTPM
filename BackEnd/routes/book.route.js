const express = require("express");
const router = express.Router();
const {
  searchBooks,
  getBookById,
  getBookBySlug,
  getBookByAuthor,
  createBook,
  updateBookById,
} = require('../controllers/book.controller')

router.get('/', searchBooks);
router.get('/id/:id', getBookById);
router.get('/:slug', getBookBySlug);
router.get('/author/:slug', getBookByAuthor);
router.post('/create', createBook);
router.put('/id/:id/edit', updateBookById);

module.exports = router;