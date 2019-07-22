// Declaracion de dependencias
const mongoose = require('mongoose');

// Configuracion del esquema de la coleccion
const SiiAuditSchema = new mongoose.Schema({
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
  period: {
    default: null,
    index: true,
    trim: true,
    type: String,
  },
  time: {
    index: true,
    required: true,
    type: Number,
  },
  type: {
    default: 'Credential',
    enum: [
      'Credential',
      'Details',
      'Documents',
      'Summary',
    ],
    index: true,
    required: true,
    trim: true,
    type: String,
  },
  user: {
    index: true,
    required: true,
    trim: true,
    type: String,
  },
});

// Se crean los indices del esquema
SiiAuditSchema.index({});

// Se exporta el esquema SiiAudit
module.exports = mongoose.model('SiiAudit', SiiAuditSchema);
