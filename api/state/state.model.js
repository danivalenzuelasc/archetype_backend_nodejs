// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const StateSchema = new mongoose.Schema({
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
  geometry: {
    coordinates: {
      latitude: {
        default: null,
        type: Number,
      },
      longitude: {
        default: null,
        type: Number,
      },
    },
    country_code: {
      index: true,
      required: true,
      type: String,
    },
    location: {
      default: null,
      type: String,
    },
    viewport: {
      northeast: {
        latitude: {
          default: null,
          type: Number,
        },
        longitude: {
          default: null,
          type: Number,
        },
      },
      southwest: {
        latitude: {
          default: null,
          type: Number,
        },
        longitude: {
          default: null,
          type: Number,
        },
      },
    },
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
StateSchema.index({
  code: 'text',
  name: 'text',
}, {
  weights: {
    code: 2,
    name: 5,
  },
});

// Export model State
module.exports = mongoose.model('State', StateSchema);
