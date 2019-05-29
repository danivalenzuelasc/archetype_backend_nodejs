// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const SiiCredentialSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  certificate: {
    index: true,
    required: false,
    trim: true,
    type: String,
  },
  logs: {
    createdAt: {
      default: new Date(),
      required: true,
      type: Date,
    },
    isDeleted: {
      default: false,
      index: true,
      required: true,
      type: Boolean,
    },
    test: {
      default: false,
      index: true,
      required: true,
      type: Boolean,
    },
    updatedAt: {
      default: null,
      required: false,
      type: Date,
    },
  },
  password: {
    index: true,
    required: true,
    trim: true,
    type: String,
  },
  user: {
    index: true,
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
});

// Export model SiiCredential
module.exports = mongoose.model('SiiCredential', SiiCredentialSchema);
