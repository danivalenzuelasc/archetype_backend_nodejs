// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const AddressSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  description: {
    default: null,
    trim: true,
    type: String,
  },
  floor: {
    default: null,
    trim: true,
    type: String,
  },
  geometry: {
    city_code: {
      index: true,
      required: true,
      trim: true,
      type: String,
    },
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
      trim: true,
      type: String,
    },
    location: {
      default: null,
      trim: true,
      type: String,
    },
    neighborhood_code: {
      index: true,
      required: true,
      trim: true,
      type: String,
    },
    state_code: {
      index: true,
      required: true,
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
    required: true,
    trim: true,
    type: String,
  },
  postal_code: {
    default: null,
    type: String,
  },
  room: {
    default: null,
    type: String,
  },
  street: {
    required: true,
    type: String,
  },
  tax: {
    role: {
      default: null,
      trim: true,
      type: String,
    },
    valuation: {
      currency: {
        default: null,
        trim: true,
        type: String,
      },
      value: {
        default: 0,
        type: Number,
      },
    },
  },
  type: {
    default: 'Street',
    enum: [
      'Avenue',
      'Boulevard',
      'Drive',
      'PassageWay',
      'Road',
      'Street',
      'Way',
    ],
    require: true,
    trim: true,
    type: String,
  },
});

// Add index search (FullText)
AddressSchema.indexes({
  'geometry.location': 'text',
  number: 'text',
  street: 'text',
  type: 'text',
}, {
  name: 'AddressIndex',
  weights: {
    'geometry.location': 5,
    number: 3,
    street: 4,
    type: 3,
  },
});

// Export model Address
module.exports = mongoose.model('Address', AddressSchema);
