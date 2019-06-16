// Declaracion de dependencias
const mongoose = require('mongoose');

// Se exportan los documentos para realizar las pruebas del esquema
module.exports = [
  {
    _id: mongoose.Types.ObjectId(),
    active: false,
    certificate: '',
    logs: {
      isDeleted: false,
      test: true,
    },
    password: 'password1',
    session: {
      expires: null,
      token: null,
    },
    user: '1-1',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    certificate: '',
    logs: {
      isDeleted: false,
      test: true,
    },
    password: 'password2',
    session: {
      expires: null,
      token: null,
    },
    user: '1-2',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    certificate: '',
    logs: {
      isDeleted: false,
      test: true,
    },
    password: 'password3',
    session: {
      expires: '2019-01-01T00:00:00.000Z',
      token: 'token1234567890',
    },
    user: '1-3',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    certificate: '',
    logs: {
      isDeleted: false,
      test: true,
    },
    password: 'password4',
    session: {
      expires: '2019-01-01T00:00:00.000Z',
      token: 'token1234567890',
    },
    user: '1-4',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    certificate: '',
    logs: {
      isDeleted: false,
      test: true,
    },
    password: 'password5',
    session: {
      expires: '2019-01-01T00:00:00.000Z',
      token: 't1o2k3e4n5',
    },
    user: '1-5',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    certificate: '',
    logs: {
      isDeleted: false,
      test: true,
    },
    password: 'password6',
    session: {
      expires: '2019-01-01T00:00:00.000Z',
      token: '1t2o3k4e5n',
    },
    user: '1-6',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    certificate: '',
    logs: {
      isDeleted: false,
      test: true,
    },
    password: '',
    session: {
      expires: null,
      token: null,
    },
    user: '',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    certificate: '',
    logs: {
      isDeleted: false,
      test: true,
    },
    password: null,
    session: {
      expires: null,
      token: null,
    },
    user: '',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    certificate: '',
    logs: {
      isDeleted: false,
      test: true,
    },
    password: '',
    session: {
      expires: null,
      token: null,
    },
    user: null,
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    certificate: '',
    logs: {
      isDeleted: false,
      test: true,
    },
    password: null,
    session: {
      expires: null,
      token: null,
    },
    user: null,
  },
];
