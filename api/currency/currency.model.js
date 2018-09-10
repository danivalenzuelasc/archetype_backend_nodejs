// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const CurrencySchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  code: {
    alphabetic: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    numeric: {
      index: true,
      required: true,
      type: Number,
      unique: true,
    },
  },
  decimal: {
    default: 0,
    required: true,
    type: Number,
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
    required: true,
    type: String,
  },
});

// Add index search (FullText)
CurrencySchema.index({
  code: 'text',
  name: 'text',
}, {
  weights: {
    code: 2,
    name: 5,
  },
});

// Export model Currency
module.exports = mongoose.model('Currency', CurrencySchema);
