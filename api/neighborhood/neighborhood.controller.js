// Declare dependencies
const mongoose = require('mongoose');
const requestPromise = require('request-promise');
const credentials = require('./../../config/credentials');
const settings = require('./../../config/settings');
const { cleanCharacters, getFormatted, parser } = require('./../../utils/google');
const { errorResponse } = require('./../../utils/errors');
const { errorTraceRaven, responseValue } = require('./../../utils/general');

// Declare model
const City = mongoose.model('City');
const Country = mongoose.model('Country');
const Neighborhood = mongoose.model('Neighborhood');
const State = mongoose.model('State');

/*  Method Create
 *  URI: /neighborhood
 *  Method: POST
 */
exports.create = (req, res) => {
  const newNeighborhood = new Neighborhood(req.body);
  newNeighborhood.save()
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      errorTraceRaven(error);
      res.status(400).json(errorResponse('create').response);
    });
};

/*  Method List
 *  URI: /neighborhood
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
    ? '_id code name'
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
  Neighborhood.count({
    'logs.isDeleted': filters.isDeleted,
    'logs.test': filters.test,
  })
    .then((responseCount) => {
      return Neighborhood.find({
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
 *  URI: /neighborhood/listing
 *  Method: GET
 */
/* istanbul ignore next */
exports.listing = (req, res) => {
  Neighborhood.find({
    'geometry.location': '',
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

/*  Method Normalize
 *  URI: /neighborhood/:id/normalize
 *  Method: GET
 */
/* istanbul ignore next */
exports.normalize = (req, res) => {
  Neighborhood.findById(req.params.id)
    .then((responseNeighborhood) => {
      return Country.findOne({
        'iso.code': responseNeighborhood.geometry.country_code,
      })
        .then((responseCountry) => {
          return State.findOne({
            code: responseNeighborhood.geometry.state_code,
          })
            .then((responseState) => {
              return City.findOne({
                code: responseNeighborhood.geometry.city_code,
              })
                .then((responseCity) => {
                  const address = `${responseNeighborhood.name}, ${responseCity.name}, ${responseState.name}, ${responseCountry.name}`;
                  const search = `https://maps.googleapis.com/maps/api/geocode/json?address=${cleanCharacters(address)}&key=${credentials.google.maps}`;
                  requestPromise(search).then((responseGoogle) => {
                    const formatted = getFormatted();
                    parser(formatted, JSON.parse(responseGoogle));
                    const body = responseNeighborhood;
                    body.geometry.coordinates.latitude = formatted.geometry.coordinates.latitude;
                    body.geometry.coordinates.longitude = formatted.geometry.coordinates.longitude;
                    body.geometry.location = formatted.geometry.location;
                    body.geometry.viewport.northeast.latitude = formatted.geometry.viewport.northeast.latitude;
                    body.geometry.viewport.northeast.longitude = formatted.geometry.viewport.northeast.longitude;
                    body.geometry.viewport.southwest.latitude = formatted.geometry.viewport.southwest.latitude;
                    body.geometry.viewport.southwest.longitude = formatted.geometry.viewport.southwest.longitude;
                    body.logs.updatedAt = new Date();
                    return Neighborhood.findOneAndUpdate({
                      _id: req.params.id,
                    }, body, {
                      new: true,
                    })
                      .then((response) => {
                        res.status(200).json(response);
                      });
                  });
                })
                .catch((errorCity) => {
                  errorTraceRaven(errorCity);
                  res.status(404).json(errorResponse('normalize').response);
                });
            })
            .catch((errorState) => {
              errorTraceRaven(errorState);
              res.status(404).json(errorResponse('normalize').response);
            });
        })
        .catch((errorCountry) => {
          errorTraceRaven(errorCountry);
          res.status(404).json(errorResponse('normalize').response);
        });
    })
    .catch((errorCity) => {
      errorTraceRaven(errorCity);
      res.status(404).json(errorResponse('normalize').response);
    });
};

/*  Method Remove
 *  URI: /neighborhood/:id
 *  Method: DELETE
 */
exports.remove = (req, res) => {
  Neighborhood.findById(req.params.id)
    .then((responseFind) => {
      if (!responseFind) {
        throw new Error();
      }
      const body = responseFind;
      body.logs.isDeleted = true;
      body.logs.updatedAt = new Date();
      return Neighborhood.findOneAndUpdate({
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
 *  URI: /neighborhood/search
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
  Neighborhood.count({
    'logs.isDeleted': filters.isDeleted,
    'logs.test': filters.test,
    $text: {
      $search: filters.text,
    },
  })
    .then((responseCount) => {
      return Neighborhood.find({
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

/*  Method Update
 *  URI: /neighborhood/:id
 *  Method: PUT
 */
exports.update = (req, res) => {
  Neighborhood.findById(req.params.id)
    .then((responseFind) => {
      if (!responseFind) {
        throw new Error();
      }
      const { body } = req;
      body.logs = responseFind.logs;
      body.logs.updatedAt = new Date();
      return Neighborhood.findOneAndUpdate({
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
 *  URI: /neighborhood/:id
 *  Method: GET
 */
exports.view = (req, res) => {
  Neighborhood.findById(req.params.id)
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
