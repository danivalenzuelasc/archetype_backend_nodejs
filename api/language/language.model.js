// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const LanguageSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  code: {
    index: true,
    required: true,
    type: String,
    unique: true,
  },
  image: {
    default: null,
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
  name: {
    index: true,
    required: true,
    type: String,
  },
});

// Add index search (FullText)
LanguageSchema.index({
  code: 'text',
  name: 'text',
}, {
  weights: {
    code: 2,
    name: 5,
  },
});

// Export model Language
module.exports = mongoose.model('Language', LanguageSchema);
