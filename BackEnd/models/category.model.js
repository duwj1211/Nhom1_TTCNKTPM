const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');

const CategorySchema = mongoose.Schema({
  name: { type: String, require: true },
  slug: {type: String, slug: 'name'},
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;