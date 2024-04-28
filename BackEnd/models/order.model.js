const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fullName: {type: String, require: false},
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
  totalPriceOriginal: { type: Number, require: true },
  totalPriceFinal: { type: Number, require: false },
  status: { type: Number, require: true, default: 0},
  shippingAddress: { type: String, require: true },
  shippingFee: { type: Number, require: false },
  totalPrice: { type: Number, require: true },
  note: { type: String, require: false },
}, { timestamps: true })

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;