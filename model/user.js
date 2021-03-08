const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    minlength: 6,
    maxlength: 255,
  },
  Password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  role: String,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
