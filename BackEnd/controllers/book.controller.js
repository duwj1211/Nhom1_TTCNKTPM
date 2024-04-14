const Book = require('../models/book.model');
const Author = require('../models/author.model');
const Category = require('../models/category.model');

const searchBooks = async (req, res) => {
  const search = req.query.search || '';
  const category = req.query.category || '';
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 12;
  const sortBy = req.query.sortBy || 'sold';
  const orderBy = req.query.orderBy === 'desc' ? -1 : 1;
  try {
    let querySearch =  {}
    if (search) {
      querySearch = {$text: { $search: search }}
    }
    if (category) {
      const categoryModel = await Category.findOne({slug: category});
      if (categoryModel) {
        querySearch['categories'] = categoryModel._id;
      } else {
        res.status(404).json({ message: "Không tìm thấy danh mục" });
      }
    }
    const books = await Book
      .find(querySearch)
      .select('_id slug name avatar priceOriginal status')
      .populate('categories')
      .sort({[sortBy]: orderBy})
      .skip((page) * limit).limit(limit);

    const totalCount = await books.length;
    const totalPages = Math.ceil(totalCount / limit); 
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
    const book = await Book
      .findOne({_id: id})
      .populate('categories')
      .populate('author', '_id slug fullName avatar');
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
    const book = await Book
      .findOne({slug: slug})
      .populate('categories')
      .populate('author', '_id slug fullName avatar');
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
  searchBooks,
  getBookById,
  getBookBySlug,
  getBookByAuthor,
  createBook,
  updateBookById,
};