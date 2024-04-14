const Author = require('../models/author.model');
const Book = require('../models/book.model');

const getAuthors = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  try {
    const totalCount = await Author.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const authors = await Author
      .find()
      .select('_id fullName avatar slug')
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      authors: authors
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuthorById = async (req, res) => {
  const id = req.params.id;
  try {
    const author = await Author.findOne({_id: id});
    if (author) {
      const books = await Book
        .find({author: author._id})
        .select('_id slug name avatar priceOriginal status')
      res.status(200).json({author, books});
    } else {
      res.status(404).json({ message: "Không tìm thấy tác giả" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuthorBySlug = async (req, res) => {
  const slug = req.params.slug;
  try {
    const author = await Author.findOne({slug: slug});
    if (author) {
      const books = await Book
        .find({author: author._id})
        .select('_id slug name avatar priceOriginal status')
      res.status(200).json({author, books});
    } else {
      res.status(404).json({ message: "Không tìm thấy tác giả" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAuthorById = async (req, res) => {
  const id = req.params.id;
  try {
    const author = await Author.findOneAndUpdate({_id: id}, req.body, {new: true});
    if (!author) {
      res.status(404).json({ message: "Không tìm thấy tác giả" });
    } else {
      res.status(200).json(author);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAuthorBySlug = async (req, res) => {
  const slug = req.params.slug;
  try {
    const author = await Author.findOneAndUpdate({slug: slug}, req.body, {new: true});
    if (!author) {
      res.status(404).json({ message: "Không tìm thấy tác giả" });
    } else {
      res.status(200).json(author);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  getAuthorBySlug,
  createAuthor,
  updateAuthorById,
  updateAuthorBySlug,
};