// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const MinisterSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  code: {
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
  name: {
    required: true,
    trim: true,
    type: String,
  },
  sacraments: {
    anointingOfTheSick: {
      default: false,
      required: true,
      type: Boolean,
    },
    baptism: {
      default: false,
      required: true,
      type: Boolean,
    },
    confirmation: {
      default: false,
      required: true,
      type: Boolean,
    },
    eucharist: {
      default: false,
      required: true,
      type: Boolean,
    },
    holyOrders: {
      default: false,
      required: true,
      type: Boolean,
    },
    marriage: {
      default: false,
      required: true,
      type: Boolean,
    },
    reconciliation: {
      default: false,
      required: true,
      type: Boolean,
    },
  },
});

// Add index search (FullText)
MinisterSchema.index({
  code: 'text',
  name: 'text',
}, {
  weights: {
    code: 3,
    name: 5,
  },
});

// Export model Minister
module.exports = mongoose.model('Minister', MinisterSchema);
