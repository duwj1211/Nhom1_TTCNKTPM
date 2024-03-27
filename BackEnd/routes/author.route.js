const express = require("express");
const router = express.Router();
const {
  getAuthors,
  getAuthorById,
  getAuthorBySlug,
  createAuthor,
  updateAuthorById,
  updateAuthorBySlug,
} = require('../controllers/author.controller')

router.get('/', getAuthors);
router.get('/id/:id', getAuthorById);
router.get('/:slug', getAuthorBySlug);
router.post('/create', createAuthor);
router.put('/id/:id/edit', updateAuthorById);
router.put('/:slug/edit', updateAuthorBySlug);

module.exports = router;