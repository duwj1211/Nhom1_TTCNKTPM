const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true })

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;