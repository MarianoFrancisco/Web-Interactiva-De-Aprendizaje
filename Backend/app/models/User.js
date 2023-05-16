const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roles: {
    Student: {
      type: Number,
      default: 2000,
    },
    Teacher: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  birthdayDate: {
    type: Date,
    required: true,
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
