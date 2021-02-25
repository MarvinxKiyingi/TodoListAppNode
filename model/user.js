const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  role: String,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
