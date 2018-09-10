// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const PhoneSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  annex: {
    default: '',
    trim: true,
    type: String,
  },
  area: {
    required: true,
    trim: true,
    type: String,
  },
  country_code: {
    index: true,
    required: true,
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
      type: Date,
    },
  },
  number: {
    index: true,
    required: true,
    trim: true,
    type: String,
  },
  primary: {
    default: false,
    required: true,
    type: Boolean,
  },
  validation: {
    index: false,
    required: true,
    type: Boolean,
  },
});

// Add index search (FullText)
PhoneSchema.index({
  annex: 'text',
  area: 'text',
  country_code: 'text',
  number: 'text',
}, {
  weights: {
    annex: 2,
    area: 2,
    country_code: 3,
    number: 5,
  },
});

// Export model Phone
module.exports = mongoose.model('Phone', PhoneSchema);
