const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
  totalPriceOrginal: { type: Number, require: true },
  totalPriceFinal: { type: Number, require: false },
}, { timestamps: true })

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;