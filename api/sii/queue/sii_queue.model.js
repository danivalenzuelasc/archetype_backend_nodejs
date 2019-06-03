// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const SiiQueueSchema = new mongoose.Schema({
  active: {
    default: true,
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
      required: true,
      type: Boolean,
    },
    test: {
      default: false,
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
      trim: true,
      type: String,
    },
    type: {
      default: 'Automatic',
      enum: [
        'Automatic',
        'Priority',
      ],
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
    unique: true,
  },
});

// Create indexes
SiiQueueSchema.index({
  user: 1,
}, {
  unique: true,
});

// Export model SiiQueue
module.exports = mongoose.model('SiiQueue', SiiQueueSchema);
