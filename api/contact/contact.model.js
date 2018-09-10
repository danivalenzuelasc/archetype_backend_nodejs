// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const ContactSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  business: {
    index: true,
    required: true,
    type: String,
  },
  details: {
    required: true,
    type: String,
  },
  email: {
    index: true,
    required: true,
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
  notification: {
    default: false,
    required: true,
    type: Boolean,
  },
  phone: {
    index: true,
    required: true,
    type: String,
  },
  position: {
    required: true,
    type: String,
  },
});

// Add index search (FullText)
ContactSchema.index({
  business: 'text',
  email: 'text',
  name: 'text',
}, {
  weights: {
    business: 2,
    email: 3,
    name: 5,
  },
});

// Export model Contact
module.exports = mongoose.model('Contact', ContactSchema);
