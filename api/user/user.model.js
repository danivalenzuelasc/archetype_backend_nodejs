// Declare dependencies
const mongoose = require('mongoose');

// Declare models
require('./../address/address.model');
require('./../email/email.model');
require('./../phone/phone.model');

// Setting model
const UserSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  authenticate: {
    password: {
      index: true,
      required: true,
      trim: true,
      type: String,
    },
    token: {
      default: '',
      index: true,
      trim: true,
      type: String,
    },
    user: {
      index: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
  },
  basic: {
    avatar: {
      default: '',
      trim: true,
      type: String,
    },
    birthday: {
      required: true,
      type: Date,
    },
    firstName: {
      index: true,
      required: true,
      trim: true,
      type: String,
    },
    gender: {
      default: 'Male',
      enum: [
        'Female',
        'Male',
      ],
      required: true,
      trim: true,
      type: String,
    },
    lastName: {
      index: true,
      required: true,
      trim: true,
      type: String,
    },
    nationality: {
      index: true,
      required: true,
      trim: true,
      type: String,
    },
  },
  contact: {
    address: [
      {
        ref: 'Address',
        required: true,
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    email: [
      {
        ref: 'Email',
        required: true,
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    phone: [
      {
        ref: 'Phone',
        required: true,
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
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
  setting: {
    language: {
      index: true,
      required: true,
      trim: true,
      type: String,
    },
    notifications: {
      default: true,
      required: true,
      type: Boolean,
    },
    privacy: {
      default: 'Public',
      enum: [
        'PrivateAll',
        'PrivateSearchable',
        'Public',
      ],
      required: true,
      trim: true,
      type: String,
    },
  },
});

// Add index search (FullText)
UserSchema.index({
  'authenticate.user': 'text',
  'basic.firstName': 'text',
  'basic.lastName': 'text',
}, {
  weights: {
    'authenticate.user': 5,
    'basic.firstName': 3,
    'basic.lastName': 3,
  },
});

// Export model User
module.exports = mongoose.model('User', UserSchema);
