// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const CountrySchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  currency: [
    {
      name: {
        required: true,
        trim: true,
        type: String,
      },
    },
  ],
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
    location: {
      default: null,
      trim: true,
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
  image: {
    default: null,
    trim: true,
    type: String,
  },
  iso: {
    code: {
      default: null,
      index: true,
      trim: true,
      type: String,
    },
    domain: {
      default: null,
      index: true,
      trim: true,
      type: String,
    },
    number: {
      default: null,
      index: true,
      type: Number,
    },
    phone: {
      default: null,
      index: true,
      trim: true,
      type: String,
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
    index: true,
    required: true,
    trim: true,
    type: String,
  },
});

// Add index search (FullText)
CountrySchema.index({
  'iso.code': 'text',
  'iso.domain': 'text',
  name: 'text',
}, {
  weights: {
    'iso.code': 2,
    'iso.domain': 2,
    name: 5,
  },
});

// Export model Country
module.exports = mongoose.model('Country', CountrySchema);
