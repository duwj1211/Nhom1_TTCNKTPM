const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
  content: { type: String, require: true },
  rating: { type: Number, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: new Date() }
})

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;