// Declare dependencies
const mongoose = require('mongoose');

// Default mocks
module.exports = [
  {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      period: null,
      type: 'Automatic',
    },
    user: '1-1',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      period: null,
      type: 'Automatic',
    },
    user: '1-2',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      period: null,
      type: 'Automatic',
    },
    user: '1-3',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      period: null,
      type: 'Automatic',
    },
    user: '1-4',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      period: '201901',
      type: 'Priority',
    },
    user: '1-5',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      period: '201901',
      type: 'Priority',
    },
    user: '1-6',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      period: null,
      type: null,
    },
    user: null,
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      period: null,
      type: null,
    },
    user: null,
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      period: null,
      type: null,
    },
    user: null,
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      period: null,
      type: null,
    },
    user: null,
  },
];
