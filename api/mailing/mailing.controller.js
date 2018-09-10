// Declare dependencies
const mongoose = require('mongoose');
const sendgrid = require('@sendgrid/mail');
const credentials = require('./../../config/credentials');
const settings = require('./../../config/settings');
const { errorResponse } = require('./../../utils/errors');
const { errorTraceRaven, responseValue } = require('./../../utils/general');

// Declare model
const Mailing = mongoose.model('Mailing');

/*  Method Create
 *  URI: /mailing
 *  Method: POST
 */
exports.create = (req, res) => {
  const newMailing = new Mailing(req.body);
  newMailing.save()
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      errorTraceRaven(error);
      res.status(400).json(errorResponse('create').response);
    });
};

/*  Method List
 *  URI: /mailing
 *  Method: GET
 */
exports.list = (req, res) => {
  // Settings filters
  const filters = {};
  filters.isDeleted = false;
  filters.limit = req.query.limit && req.query.limit ?
    (parseInt(req.query.limit, 10) < 1 || parseInt(req.query.limit, 10) > settings.endpoint.limit)
      ? settings.endpoint.limit
      : parseInt(req.query.limit, 10)
    : settings.endpoint.limit;
  filters.page = req.query.page && req.query.page ?
    parseInt(req.query.page, 10) < 1
      ? 0
      : filters.limit * (parseInt(req.query.page, 10) - 1)
    : 0;
  filters.query = Object.prototype.hasOwnProperty.call(req.query, 'short')
    ? '_id mail type'
    : '';
  filters.sort = req.query.order && req.query.order === 'desc'
    ? -1
    : 1;
  filters.test = false;
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
  Mailing.count({
    'logs.isDeleted': filters.isDeleted,
    'logs.test': filters.test,
  })
    .then((responseCount) => {
      return Mailing.find({
        'logs.isDeleted': filters.isDeleted,
        'logs.test': filters.test,
      }, filters.query, {
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

/*  Method Listing
 *  URI: /mailing/listing
 *  Method: GET
 */
/* istanbul ignore next */
exports.listing = (req, res) => {
  Mailing.find({
    'execute.send': false,
    'logs.isDeleted': false,
    'logs.test': false,
  }, '_id', {
    limit: 50,
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      errorTraceRaven(error);
      res.status(404).json(errorResponse('normalize').response);
    });
};

/*  Method Remove
 *  URI: /mailing/:id
 *  Method: DELETE
 */
exports.remove = (req, res) => {
  Mailing.findById(req.params.id)
    .then((responseFind) => {
      if (!responseFind) {
        throw new Error();
      }
      const body = responseFind;
      body.logs.isDeleted = true;
      body.logs.updatedAt = new Date();
      return Mailing.findOneAndUpdate({
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

/*  Method Search
 *  URI: /mailing/search
 *  Method: GET
 */
exports.search = (req, res) => {
  // Settings filters
  const filters = {};
  filters.isDeleted = false;
  filters.limit = req.query.limit && req.query.limit ?
    (parseInt(req.query.limit, 10) < 1 || parseInt(req.query.limit, 10) > settings.endpoint.limit)
      ? settings.endpoint.limit
      : parseInt(req.query.limit, 10)
    : settings.endpoint.limit;
  filters.page = req.query.page && req.query.page ?
    parseInt(req.query.page, 10) < 1
      ? 0
      : filters.limit * (parseInt(req.query.page, 10) - 1)
    : 0;
  filters.test = false;
  filters.text = Object.prototype.hasOwnProperty.call(req.query, 'text')
    ? req.query.text
    : '';
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
          break;
      }
    });
  }
  Mailing.count({
    'logs.isDeleted': filters.isDeleted,
    'logs.test': filters.test,
    $text: { $search: filters.text },
  })
    .then((responseCount) => {
      return Mailing.find({
        'logs.isDeleted': filters.isDeleted,
        'logs.test': filters.test,
        $text: {
          $search: filters.text,
        },
      }, {
        score: {
          $meta: 'textScore',
        },
      })
        .limit(filters.limit)
        .skip(filters.page)
        .sort({
          score: {
            $meta: 'textScore',
          },
        })
        .then((responseSearch) => {
          if (filters.catch) {
            throw new Error();
          } else {
            res.status(200).json({
              paging: {
                count: responseSearch.length,
                limit: filters.limit,
                page: (filters.page / filters.limit) + 1,
                total: responseValue(0, responseCount, 0),
              },
              results: responseSearch,
            });
          }
        })
        .catch((errorSearch) => {
          errorTraceRaven(errorSearch);
          res.status(404).json(errorResponse('list').response);
        });
    });
};

/*  Method Send
 *  URI: /mailing/:id/send
 *  Method: GET
 */
/* istanbul ignore next */
exports.send = (req, res) => {
  Mailing.findOne({
    _id: req.params.id,
    'execute.send': false,
  }, '')
    .then((responseFind) => {
      sendgrid.setApiKey(credentials.sendgrid);
      sendgrid.send({
        from: responseFind.mail.from,
        html: responseFind.mail.html,
        subject: responseFind.mail.subject,
        text: responseFind.mail.text,
        to: responseFind.mail.to,
      })
        .then(() => {
          const body = Object.assign({}, responseFind._doc);
          body.execute.datetime = new Date();
          body.execute.send = true;
          body.logs.updatedAt = new Date();
          Mailing.findOneAndUpdate({
            _id: req.params.id,
          }, body, {
            new: true,
          })
            .then((responseMailing) => {
              res.status(200).json(responseMailing);
            });
        })
        .catch((errorMailing) => {
          errorTraceRaven(errorMailing);
          res.status(404).json(errorResponse('mail').response);
        });
    })
    .catch((errorFind) => {
      errorTraceRaven(errorFind);
      res.status(404).json(errorResponse('mail').response);
    });
};

/*  Method Update
 *  URI: /mailing/:id
 *  Method: PUT
 */
exports.update = (req, res) => {
  Mailing.findById(req.params.id)
    .then((responseFind) => {
      if (!responseFind) {
        throw new Error();
      }
      const { body } = req;
      body.logs = responseFind.logs;
      body.logs.updatedAt = new Date();
      return Mailing.findOneAndUpdate({
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
      res.status(404).send(errorResponse('update').response);
    });
};

/*  Method View
 *  URI: /mailing/:id
 *  Method: GET
 */
exports.view = (req, res) => {
  Mailing.findById(req.params.id)
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
