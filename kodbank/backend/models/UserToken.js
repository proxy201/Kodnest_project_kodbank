const mongoose = require('mongoose');

const userTokenSchema = new mongoose.Schema({
  tid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  token: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true,
    index: true
  },
  expiry: {
    type: Date,
    required: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // Auto-delete after 24 hours
  }
});

module.exports = mongoose.model('UserToken', userTokenSchema);
