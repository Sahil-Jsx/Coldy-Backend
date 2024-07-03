const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: [true, "Customer name is required"],
    trim: true, // This will remove leading and trailing whitespaces
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "Customer name cannot be empty",
    },
  },
  shop_name: {
    type: String,
    required: [true, "Shop name is required"],
    trim: true, // This will remove leading and trailing whitespaces
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "Shop name cannot be empty",
    },
  },
  phone: {
    type: Number,
    unique: true,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        return v !== null && v !== undefined && v.toString().trim().length > 0;
      },
      message: "Phone number cannot be empty",
    },
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "locations",
    required: [true, "Location is required"],
    validate: {
      validator: function (v) {
        return v !== null && v !== undefined;
      },
      message: "Location cannot be empty",
    },
  },
});

const Customer = mongoose.model("customers", CustomerSchema);

module.exports = Customer;
