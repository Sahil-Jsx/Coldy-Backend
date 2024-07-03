const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
