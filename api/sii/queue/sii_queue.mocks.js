// Declaracion de dependencias
const mongoose = require('mongoose');

// Se exportan los documentos para realizar las pruebas del esquema
module.exports = [
  {
    _id: mongoose.Types.ObjectId(),
    active: true,
    executions: [],
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      date: null,
      period: null,
      type: 'Automatic',
    },
    user: '1-1',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    executions: [
      {
        code: 'Code 02',
        period: '201902',
        types: [],
        value: 'Value 02',
      },
    ],
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      date: null,
      period: null,
      type: 'Automatic',
    },
    user: '1-2',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    executions: [
      {
        code: 'Code 03',
        period: '201903',
        types: [
          {
            code: 1,
            count: 0,
            processed: 0,
          },
        ],
        value: 'Value 03',
      },
    ],
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      date: '2019-01-01T00:00:00.000Z',
      period: null,
      type: 'Automatic',
    },
    user: '1-3',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    executions: [
      {
        code: 'Code 04',
        period: '201904',
        types: [
          {
            code: 1,
            count: 0,
            processed: 0,
          }, {
            code: 2,
            count: 0,
            processed: 0,
          },
        ],
        value: 'Value 04',
      },
    ],
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      date: '2019-01-01T00:00:00.000Z',
      period: null,
      type: 'Automatic',
    },
    user: '1-4',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    executions: [],
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      date: '2019-01-01T00:00:00.000Z',
      period: '201901',
      type: 'Priority',
    },
    user: '1-5',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    executions: [],
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      date: '2019-01-01T00:00:00.000Z',
      period: '201901',
      type: 'Priority',
    },
    user: '1-6',
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    executions: [],
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      date: null,
      period: null,
      type: null,
    },
    user: null,
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    executions: [],
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      date: null,
      period: null,
      type: null,
    },
    user: null,
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    executions: [],
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      date: null,
      period: null,
      type: null,
    },
    user: null,
  }, {
    _id: mongoose.Types.ObjectId(),
    active: true,
    executions: [],
    logs: {
      isDeleted: false,
      test: true,
    },
    synchronize: {
      date: null,
      period: null,
      type: null,
    },
    user: null,
  },
];
