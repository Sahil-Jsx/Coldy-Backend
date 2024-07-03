const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
  location: {
    type: String,
    unique: true,
    required: true,
  },
});

const Location = mongoose.model("locations", LocationSchema);

module.exports = Location;
