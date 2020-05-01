var mongoose = require("mongoose");

var User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field is required"]
  },
  email: {
    type: String,
    required: [true, "email is required "]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  posts: {
    type: [String],
  },
  date: {
    type: Date
  }

});
module.exports = mongoose.model("User", User);