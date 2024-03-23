const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
  name: { type: String, require: true },
  avatar: { type: String, require: true },
  priceOrginal: { type: Number, require: true },
  priceFinal: { type: Number, require: false },
  quantity: { type: Number, require: true },
  publicDate: { type: String, require: true },
  publisher: { type: String, require: false },
  pageNumber: { type: String, require: false },
  description: { type: String, require: false },
  size: { type: String, require: false },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
})

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;