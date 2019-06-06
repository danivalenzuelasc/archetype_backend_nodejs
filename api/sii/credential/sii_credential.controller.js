// Declare dependencies
const cryptr = require('cryptr');
const mongoose = require('mongoose');
const settings = require('../../../config/settings');
const { errorResponse } = require('../../../utils/errors');
const { errorTraceRaven, responseValue } = require('../../../utils/general');
const { getCredentials } = require('./../../../utils/sii');

// Declare model
const Cryptr = new cryptr(settings.endpoint.crypt);
const SiiCredential = mongoose.model('SiiCredential');

/*  Method Create
 *  URI: /sii/credential
 *  Method: POST
 */
exports.create = (req, res) => {
  if (req.body.password) {
    req.body.password = Cryptr.encrypt(req.body.password);
  }
  const newSiiCredential = new SiiCredential(req.body);
  getCredentials(req.body.user, req.body.password)
    .then(() => {
      newSiiCredential.save()
        .then((response) => {
          res.status(201).json(response);
        })
        .catch((error) => {
          errorTraceRaven(error);
          res.status(400).json(errorResponse('create').response);
        });
    })
    .catch((error) => {
      errorTraceRaven(error);
      res.status(400).json(errorResponse('create').response);
    });
};

/*  Method List
 *  URI: /sii/credential
 *  Method: GET
 */
exports.list = (req, res) => {
  // Settings filters
  const filters = {};
  filters.isDeleted = false;
  filters.limit = req.query.limit && Number.isInteger(parseInt(req.query.limit, 10)) ?
    (parseInt(req.query.limit, 10) < 1 || parseInt(req.query.limit, 10) > settings.endpoint.limit)
      ? settings.endpoint.limit
      : parseInt(req.query.limit, 10)
    : settings.endpoint.limit;
  filters.page = req.query.page && Number.isInteger(parseInt(req.query.page, 10)) ?
    parseInt(req.query.page, 10) < 1
      ? 0
      : filters.limit * (parseInt(req.query.page, 10) - 1)
    : 0;
  filters.query = Object.prototype.hasOwnProperty.call(req.query, 'short')
    ? '_id user'
    : '';
  filters.sort = req.query.order && req.query.order === 'desc'
    ? -1
    : 1;
  filters.test = false;
  filters.user = req.query.user;
  // Verify import logs
  if (req.query.logs) {
    req.query.logs.split(',').forEach((log) => {
      switch (log) {
        case 'c':
          filters.catch = true;
          break;
        case 'd':
          filters.isDeleted = true;
          break;
        case 't':
          filters.test = true;
          break;
        default:
      }
    });
  }
  const query = {
    'logs.isDeleted': filters.isDeleted,
    'logs.test': filters.test,
  };
  if (filters.user) {
    query.user = filters.user;
  }
  SiiCredential.countDocuments(query)
    .then((responseCount) => {
      return SiiCredential.find(query, filters.query, {
        limit: filters.limit,
        skip: filters.page,
        sort: {
          name: filters.sort,
        },
      })
        .then((responseList) => {
          if (filters.catch) {
            throw new Error();
          } else {
            res.status(200).json({
              paging: {
                count: responseList.length,
                limit: filters.limit,
                order: filters.sort === 1 ? 'asc' : 'desc',
                page: (filters.page / filters.limit) + 1,
                total: responseValue(0, responseCount, 0),
              },
              results: responseList,
            });
          }
        })
        .catch((errorList) => {
          errorTraceRaven(errorList);
          res.status(404).json(errorResponse('list').response);
        });
    });
};

/*  Method Remove
 *  URI: /sii/credential/:id
 *  Method: DELETE
 */
exports.remove = (req, res) => {
  SiiCredential.findById(req.params.id)
    .then((responseFind) => {
      if (!responseFind) {
        throw new Error();
      }
      const body = responseFind;
      body.logs.isDeleted = true;
      body.logs.updatedAt = new Date();
      return SiiCredential.findOneAndUpdate({
        _id: req.params.id,
      }, body, {
        new: true,
      })
        .then((responseRemove) => {
          res.status(200).json(responseRemove);
        });
    })
    .catch((errorFind) => {
      errorTraceRaven(errorFind);
      res.status(404).send(errorResponse('remove').response);
    });
};

/*  Method Update
 *  URI: /sii/credential/:id
 *  Method: PUT
 */
exports.update = (req, res) => {
  SiiCredential.findById(req.params.id)
    .then((responseFind) => {
      if (!responseFind) {
        throw new Error();
      }
      const { body } = req;
      if (req.body.password) {
        body.password = Cryptr.encrypt(req.body.password);
      }
      body.logs.updatedAt = new Date();
      getCredentials(body.user, body.password)
        .then(() => {
          SiiCredential.findOneAndUpdate({
            _id: req.params.id,
          }, body, {
            new: true,
          })
            .then((responseUpdate) => {
              res.status(200).json(responseUpdate);
            });
        })
        .catch((errorFind) => {
          errorTraceRaven(errorFind);
          res.status(400).send(errorResponse('update').response);
        });
    })
    .catch((errorFind) => {
      errorTraceRaven(errorFind);
      res.status(404).send(errorResponse('update').response);
    });
};

/*  Method Verify
 *  URI: /sii/credential/verify
 *  Method: POST
 */
exports.verify = (req, res) => {
  const { production } = req.body;
  if (req.body.password) {
    req.body.password = Cryptr.encrypt(req.body.password);
  }
  getCredentials(req.body.user, req.body.password, production)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        res.status(200).json(response);
      } else {
        res.status(400).json(errorResponse('create').response);
      }
    });
};

/*  Method View
 *  URI: /sii/credential/:id
 *  Method: GET
 */
exports.view = (req, res) => {
  SiiCredential.findById(req.params.id)
    .then((responseFind) => {
      if (!responseFind) {
        throw new Error();
      }
      res.status(200).json(responseFind);
    })
    .catch((errorFind) => {
      errorTraceRaven(errorFind);
      res.status(404).send(errorResponse('view').response);
    });
};
