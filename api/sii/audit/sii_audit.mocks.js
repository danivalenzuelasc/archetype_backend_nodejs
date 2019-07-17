// Declaracion de dependencias
const mongoose = require('mongoose');

// Se exportan los documentos para realizar las pruebas del esquema
module.exports = [
  {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    period: '201901',
    time: 100,
    type: 'Credential',
    user: '1-1',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    period: '201902',
    time: 200,
    type: 'Summary',
    user: '1-2',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    period: '201903',
    time: 300,
    type: 'Documents',
    user: '1-3',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    period: '201904',
    time: 400,
    type: 'Details',
    user: '1-4',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    period: '201905',
    time: 500,
    type: 'Credential',
    user: '1-5',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    period: '201906',
    time: 600,
    type: 'Summary',
    user: '1-6',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    period: null,
    time: 100,
    type: 'Credential',
    user: '',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    period: '201901',
    time: null,
    type: 'Credential',
    user: '',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    period: '201901',
    time: 100,
    type: null,
    user: null,
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    period: null,
    time: null,
    type: null,
    user: null,
  },
];
