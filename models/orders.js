const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  order_no: {
    type: String,
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  total_amount: {
    type: Number,
  },
  pending: {
    type: Number,
  },
  order_details: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      product_price: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Order = mongoose.model("Orders", OrdersSchema);
module.exports = Order;
