// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const SiiCredentialSchema = new mongoose.Schema({
  active: {
    default: true,
    required: true,
    type: Boolean,
  },
  certificate: {
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
      required: true,
      type: Boolean,
    },
    test: {
      default: false,
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

// Create indexes
SiiCredentialSchema.index({
  user: 1,
}, {
  unique: true,
});

// Export model SiiCredential
module.exports = mongoose.model('SiiCredential', SiiCredentialSchema);
