const mongoose = require('mongoose')

const OrderItemSchema = mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  priceOrginal: { type: Number, require: true },
  priceFinal: { type: Number, require: false },
  quantity: { type: Number, require: true, default: 1 },
})

const OrderItem = mongoose.model("OrderItem", OrderItemSchema);

module.exports = OrderItem;