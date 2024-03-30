const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
const { StatusBook } = require('../constant')

mongoose.plugin(slug);

const BookSchema = mongoose.Schema({
  name: { type: String, require: true },
  avatar: { type: String, require: true },
  priceOrginal: { type: Number, require: true },
  priceFinal: { type: Number, require: false },
  quantity: { type: Number, require: true },
  publicDate: { type: Date, require: true },
  publisher: { type: String, require: false },
  translator: { type: String, require: false },
  pageNumber: { type: String, require: false },
  description: { type: String, require: false },
  size: { type: String, require: false },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  sold: { type: Number, default: 0},
  status: { type: Number, require: true, default: StatusBook.SELLING },
  slug: {type: String, slug: 'name'}, 
}, {
  timestamps: true
})

BookSchema.index({name: 'text', description: 'text'})

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;