// Declaracion de dependencias
const mongoose = require('mongoose');

// Configuracion del esquema de la coleccion
const SiiCredentialSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  certificate: {
    required: false,
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
  password: {
    required: true,
    trim: true,
    type: String,
  },
  session: {
    expires: {
      default: null,
      type: Date,
    },
    token: {
      default: null,
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
SiiCredentialSchema.index({});

// Se exporta el esquema SiiCredential
module.exports = mongoose.model('SiiCredential', SiiCredentialSchema);
