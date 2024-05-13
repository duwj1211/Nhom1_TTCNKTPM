const express = require("express");
const router = express.Router();
const {
  searchBooks,
  getBookById,
  getBookBySlug,
  getBookByAuthor,
  createBook,
  updateBookById,
  addReviewBook,
} = require('../controllers/book.controller');
const { verifyToken } = require('../middleware/authJwt');

router.get('/', searchBooks);
router.get('/id/:id', getBookById);
router.get('/:slug', getBookBySlug);
// router.get('/author/:slug', getBookByAuthor);
router.post('/create', createBook);
router.put('/id/:id/edit', updateBookById);
router.post('/:slug/addreviewbook',verifyToken, addReviewBook);

module.exports = router;