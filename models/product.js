const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
