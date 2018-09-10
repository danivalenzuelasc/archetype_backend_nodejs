// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const ParishSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  authorities: {
    deacon: [
      {
        name: {
          required: true,
          trim: true,
          type: String,
        },
      },
    ],
    parson: [
      {
        name: {
          index: true,
          required: true,
          trim: true,
          type: String,
        },
        primary: {
          default: false,
          index: true,
          required: true,
          type: Boolean,
        },
      },
    ],
    secretary: [
      {
        name: {
          required: true,
          trim: true,
          type: String,
        },
      },
    ],
  },
  code: {
    index: true,
    required: true,
    trim: true,
    type: String,
  },
  contact: {
    email: [
      {
        primary: {
          default: true,
          index: true,
          required: true,
          type: Boolean,
        },
        value: {
          index: true,
          required: true,
          trim: true,
          type: String,
        },
      },
    ],
    phone: [
      {
        primary: {
          default: true,
          index: true,
          required: true,
          type: Boolean,
        },
        value: {
          index: true,
          required: true,
          trim: true,
          type: String,
        },
      },
    ],
  },
  created: {
    default: null,
    index: true,
    type: Date,
  },
  district: {
    archdiocese_code: {
      default: null,
      index: true,
      trim: true,
      type: String,
    },
    decanato_code: {
      default: null,
      index: true,
      trim: true,
      type: String,
    },
    diocese_code: {
      default: null,
      index: true,
      trim: true,
      type: String,
    },
    vicarage_code: {
      default: null,
      index: true,
      trim: true,
      type: String,
    },
  },
  geolocation: {
    address: {
      code_postal: {
        default: null,
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
      number: {
        index: true,
        required: true,
        trim: true,
        type: String,
      },
      street: {
        index: true,
        required: true,
        trim: true,
        type: String,
      },
    },
    city_code: {
      index: true,
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
  },
  image: {
    default: null,
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
    index: true,
    required: true,
    trim: true,
    type: String,
  },
  schedule: {
    attention: {
      friday: {
        finish: {
          default: null,
          required: true,
          type: Date,
        },
        start: {
          default: null,
          required: true,
          type: Date,
        },
      },
      monday: {
        finish: {
          default: null,
          required: true,
          type: Date,
        },
        start: {
          default: null,
          required: true,
          type: Date,
        },
      },
      saturday: {
        finish: {
          default: null,
          required: true,
          type: Date,
        },
        start: {
          default: null,
          required: true,
          type: Date,
        },
      },
      sunday: {
        finish: {
          default: null,
          required: true,
          type: Date,
        },
        start: {
          default: null,
          required: true,
          type: Date,
        },
      },
      thursday: {
        finish: {
          default: null,
          required: true,
          type: Date,
        },
        start: {
          default: null,
          required: true,
          type: Date,
        },
      },
      tuesday: {
        finish: {
          default: null,
          required: true,
          type: Date,
        },
        start: {
          default: null,
          required: true,
          type: Date,
        },
      },
      wednesday: {
        finish: {
          default: null,
          required: true,
          type: Date,
        },
        start: {
          default: null,
          required: true,
          type: Date,
        },
      },
    },
    eucharist: [
      {
        day: {
          enum: ['Friday', 'Monday', 'Saturday', 'Sunday', 'Thursday', 'Tuesday', 'Wednesday'],
          required: true,
          trim: true,
          type: String,
        },
        hour: {
          required: true,
          type: Date,
        },
      },
    ],
  },
});

// Add index search (FullText)
ParishSchema.index({
  code: 'text',
  name: 'text',
}, {
  weights: {
    code: 3,
    name: 5,
  },
});

// Export model Parish
module.exports = mongoose.model('Parish', ParishSchema);
