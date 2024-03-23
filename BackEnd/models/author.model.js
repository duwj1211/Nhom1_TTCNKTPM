const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema({
  fullName: { type: String, require: true },
  avatar: { type: String, require: false },
  description: { type: String, require: false },
  country: { type: String, require: false },
})

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;