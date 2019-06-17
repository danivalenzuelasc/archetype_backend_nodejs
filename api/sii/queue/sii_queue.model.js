// Declaracion de dependencias
const mongoose = require('mongoose');

// Configuracion del esquema de la coleccion
const SiiQueueSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
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
        },
      ],
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
      index: true,
      type: Date,
    },
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
    unique: true,
  },
});

// Se crean los indices del esquema
SiiQueueSchema.index({
  user: 1,
}, {
  unique: true,
});

// Se exporta el esquema SiiQueue
module.exports = mongoose.model('SiiQueue', SiiQueueSchema);
