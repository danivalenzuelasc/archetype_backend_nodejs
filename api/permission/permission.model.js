// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const PermissionSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  code: {
    enum: [
      'admin',
      'city',
      'contact',
      'country',
      'currency',
      'email',
      'language',
      'mailing',
      'minister',
      'neighborhood',
      'parish',
      'permission',
      'phone',
      'social_network',
      'state',
      'timezone',
      'user',
    ],
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
  privileges: {
    create: {
      default: false,
      index: true,
      required: true,
      type: Boolean,
    },
    delete: {
      default: false,
      index: true,
      required: true,
      type: Boolean,
    },
    execute: {
      default: false,
      index: true,
      required: true,
      type: Boolean,
    },
    read: {
      default: false,
      index: true,
      required: true,
      type: Boolean,
    },
    update: {
      default: false,
      index: true,
      required: true,
      type: Boolean,
    },
  },
});

// Add index search (FullText)
PermissionSchema.index({
  code: 'text',
  name: 'text',
}, {
  weights: {
    code: 3,
    name: 5,
  },
});

// Export model Permission
module.exports = mongoose.model('Permission', PermissionSchema);
