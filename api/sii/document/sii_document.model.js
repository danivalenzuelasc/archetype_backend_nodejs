// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const SiiDocumentSchema = new mongoose.Schema({
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
      required: false,
      type: Date,
    },
  },
  synchronize: {
    period: {
      default: null,
      index: true,
      trim: true,
      type: String,
    },
    type: {
      default: 'Automatic',
      enum: [
        'Automatic',
        'Priority',
      ],
      index: true,
      require: true,
      trim: true,
      type: String,
    },
  },
  user: {
    index: true,
    required: true,
    trim: true,
    type: String,
  },
});

// Export model SiiDocument
module.exports = mongoose.model('SiiDocument', SiiDocumentSchema);
