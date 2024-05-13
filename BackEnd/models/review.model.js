const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
  content: { type: String, require: true },
  rating: { type: Number, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: new Date() }
})

const Reviews = mongoose.model("Reviews", ReviewSchema);

module.exports = Reviews;