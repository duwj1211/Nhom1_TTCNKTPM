const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');

const CategorySchema = mongoose.Schema({
  name: { type: String, require: true },
  slug: {type: String, slug: 'name'},
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;