const Book = require('../models/book.model');
const Author = require('../models/author.model');

const getBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  try {
    const totalCount = await Book.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const books = await Book.find()
                                .skip((page - 1) * limit)
                                .limit(limit);
    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      books: books
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findOne({_id: id});
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Không tìm thấy sách" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookBySlug = async (req, res) => {
  const slug = req.params.slug;
  try {
    const book = await Book.findOne({slug: slug});
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Không tìm thấy sách" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookByAuthor = async (req, res) => {
  const slug = req.params.slug;
  try {
    const author = await Author.findOne({slug: slug});
    console.log(author);
    if (author) {
      const books = await Book.find({ author: author._id });
      res.status(200).json(books);
    } else {
      res.status(404).json({ message: "Không tìm thấy sách" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findOneAndUpdate({_id: id}, req.body, {new: true});
    if (!book) {
      res.status(404).json({ message: "Không tìm thấy sách" });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  getBookBySlug,
  getBookByAuthor,
  createBook,
  updateBookById,
};