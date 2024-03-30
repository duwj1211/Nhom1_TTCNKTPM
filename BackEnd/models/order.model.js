const mongoose = require('mongoose');
import OrderItem from './orderItem.model';

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [OrderItem],
  totalPriceOrginal: { type: Number, require: true },
  totalPriceFinal: { type: Number, require: false },
  status: { type: Number, require: true, default: 0},
  shipping_address: { type: String, require: true },
}, { timestamps: true })

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;