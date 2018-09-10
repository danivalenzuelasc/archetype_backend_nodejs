// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const SocialNetworkSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  image: {
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
  url: {
    default: false,
    required: true,
    type: String,
  },
});

// Add index search (FullText)
SocialNetworkSchema.index({
  name: 'text',
  url: 'text',
}, {
  weights: {
    name: 5,
    url: 3,
  },
});

// Export model SocialNetwork
module.exports = mongoose.model('SocialNetwork', SocialNetworkSchema);
