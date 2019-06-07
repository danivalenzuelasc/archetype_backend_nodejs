// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const SiiQueueSchema = new mongoose.Schema({
  active: {
    default: true,
    required: true,
    type: Boolean,
  },
  executions: [
    {
      code: {
        required: true,
        trim: true,
        type: String,
      },
      period: {
        required: true,
        trim: true,
        type: String,
      },
      types: [
        {
          code: {
            required: true,
            type: Number,
          },
          count: {
            default: 0,
            type: Number,
          },
          processed: {
            default: 0,
            type: Number,
          },
        },
      ],
      value: {
        required: true,
        trim: true,
        type: String,
      },
    },
  ],
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
    date: {
      default: null,
      type: Date,
    },
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
