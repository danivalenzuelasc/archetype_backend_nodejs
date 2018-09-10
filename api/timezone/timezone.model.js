// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const TimezoneSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
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
    trim: true,
    type: String,
  },
  utc: {
    required: true,
    trim: true,
    type: String,
  },
  zone: {
    required: true,
    trim: true,
    type: String,
  },
});

// Add index search (FullText)
TimezoneSchema.index({
  name: 'text',
  utc: 'text',
  zone: 'text',
}, {
  weights: {
    name: 5,
    utc: 2,
    zone: 3,
  },
});

// Export model Timezone
module.exports = mongoose.model('Timezone', TimezoneSchema);
