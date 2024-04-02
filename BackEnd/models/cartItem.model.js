const mongoose = require('mongoose')

const CartItemSchema = mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  quantity: { type: Number, require: true, default: 1},
})

const CartItem = mongoose.model("CartItem", CartItemSchema);

module.exports = CartItem;