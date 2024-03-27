const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const AuthorSchema = mongoose.Schema({
  fullName: { type: String, require: true },
  avatar: { type: String, require: false },
  description: { type: String, require: false },
  country: { type: String, require: false },
  slug: {type: String, slug: 'fullName'}, 
}, {
  timestamps: true
})

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;