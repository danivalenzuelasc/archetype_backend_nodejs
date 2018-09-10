// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const EmailSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  email: {
    index: true,
    required: true,
    unique: true,
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
      type: Date,
    },
  },
  primary: {
    default: false,
    required: true,
    type: Boolean,
  },
  validation: {
    default: false,
    required: true,
    type: Boolean,
  },
});

// Add index search (FullText)
EmailSchema.index({
  email: 'text',
}, {
  weights: {
    email: 5,
  },
});

// Export model Email
module.exports = mongoose.model('Email', EmailSchema);
