// Declaracion de dependencias
const cryptr = require('cryptr');
const mongoose = require('mongoose');
const settings = require('../../../config/settings');
const { errorResponse } = require('../../../utils/errors');
const { errorTraceRaven } = require('../../../utils/general');
const { getCredentials } = require('./../../../utils/sii');

// Declaracion del esquema
const SiiCredential = mongoose.model('SiiCredential');
const SiiDocument = mongoose.model('SiiDocument');
const SiiQueue = mongoose.model('SiiQueue');

// Declaracion de variables auxiliares
const Cryptr = new cryptr(settings.endpoint.crypt);

/**
 * Metodo Create
 * URI: /sii/credential
 * Method: POST
 */
exports.create = (req, res) => {
  // Se verifica que exista un parametro de tipo password para ser encriptado
  if (req.body.password) {
    req.body.password = Cryptr.encrypt(req.body.password);
  }
  // Se verifica que exista un parametro de tipo user para eliminar los puntos en el string
  if (req.body.user) {
    req.body.user = req.body.user.replace(/\./g, '');
  }
  // Se genera una instancia del esquema
  const newSiiCredential = new SiiCredential(req.body);
  // Se verifican las credenciales contra el SII
  getCredentials(req.body.user, req.body.password)
    .then(() => {
      // Se procede a almacenar el documento en la coleccion
      newSiiCredential.save()
        .then((response) => {
          // Se retorna la respuesta del documento almacenado
          res.status(201).json(response);
        })
        .catch((errorCreate) => {
          // Se retorna la respuesta con problemas
          errorTraceRaven(errorCreate);
          res.status(400).json({
            error: errorResponse('create').response,
            errorTrace: errorCreate,
          });
        });
    })
    .catch((errorCredential) => {
      // Se retorna la respuesta con problemas
      errorTraceRaven(errorCredential);
      res.status(400).json({
        error: errorResponse('create').response,
        errorTrace: errorCredential,
      });
    });
};

/**
 * Metodo Delete
 * URI: /sii/credential/delete/:user
 * Method: DELETE
 */
exports.delete = (req, res) => {
  // Se verifica que exista el documento en la coleccion
  SiiCredential.deleteMany({ user: req.params.user }, (errorCredential) => {
    /* istanbul ignore next */
    if (errorCredential) {
      // Se retorna la respuesta con problemas
      /* istanbul ignore next */
      errorTraceRaven(errorCredential);
      /* istanbul ignore next */
      res.status(404).send({
        error: errorResponse('remove').response,
        errorTrace: errorCredential,
      });
    } else {
      SiiDocument.deleteMany({ 'transaction.user': req.params.user }, (errorDocument) => {
        /* istanbul ignore next */
        if (errorDocument) {
          // Se retorna la respuesta con problemas
          /* istanbul ignore next */
          errorTraceRaven(errorDocument);
          /* istanbul ignore next */
          res.status(404).send({
            error: errorResponse('remove').response,
            errorTrace: errorDocument,
          });
        } else {
          SiiQueue.deleteMany({ user: req.params.user }, (errorQueue) => {
            /* istanbul ignore next */
            if (errorQueue) {
              // Se retorna la respuesta con problemas
              /* istanbul ignore next */
              errorTraceRaven(errorQueue);
              /* istanbul ignore next */
              res.status(404).send({
                error: errorResponse('remove').response,
                errorTrace: errorQueue,
              });
            } else {
              // Se retorna la respuesta del documento actualizado
              res.status(200).json({});
            }
          });
        }
      });
    }
  });
};

/**
 * Metodo List
 * URI: /sii/credential
 * Method: GET
 */
exports.list = (req, res) => {
  // Se configuran los filtros que se aplicaran al listado
  const filters = {};
  filters.active = !Object.prototype.hasOwnProperty.call(req.query, 'notActive');
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
  // Se aplican los filtros de logeo para el listado
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
  // Se genera la estructura de filtros para el esquema
  const query = {
    active: filters.active,
    'logs.isDeleted': filters.isDeleted,
    'logs.test': filters.test,
  };
  if (filters.user) {
    query.user = filters.user;
  }
  // Se obtiene la cantidad de documentos en la coleccion que coinciden con los filtros aplicados
  SiiCredential.countDocuments(query)
    .then((responseCount) => {
      // Se obtienen los documentos de la coleccion que coinciden con los filtros aplicados
      SiiCredential.find(query, filters.query, {
        limit: filters.limit,
        skip: filters.page,
        sort: {
          user: filters.sort,
        },
      })
        .then((responseList) => {
          // Se simula un error en la obtencion de documentos de la coleccion
          if (filters.catch) {
            throw new Error();
          } else {
            // Se retorna la respuesta de los documentos obtenidos
            res.status(200).json({
              paging: {
                count: responseList.length,
                limit: filters.limit,
                order: filters.sort === 1 ? 'asc' : 'desc',
                page: (filters.page / filters.limit) + 1,
                total: responseCount,
              },
              results: responseList,
            });
          }
        })
        .catch((errorList) => {
          // Se retorna la respuesta con problemas
          errorTraceRaven(errorList);
          res.status(404).json({
            error: errorResponse('list').response,
            errorTrace: errorList,
          });
        });
    });
};

/**
 * Metodo Remove
 * URI: /sii/credential/:id
 * Method: DELETE
 */
exports.remove = (req, res) => {
  // Se verifica que exista el documento en la coleccion
  SiiCredential.findById(req.params.id)
    .then((responseFind) => {
      // Se verifica que el documento no presente fallas, en caso de contar con fallas se retorna un error
      if (!responseFind) {
        throw new Error();
      }
      // Se genera el documento actualizado para ser actualizado
      const body = responseFind;
      body.logs.isDeleted = true;
      body.logs.updatedAt = new Date();
      // Se procede a actualizar el documento en la coleccion
      SiiCredential.findOneAndUpdate({
        _id: req.params.id,
      }, body, {
        new: true,
      })
        .then((responseRemove) => {
          // Se retorna la respuesta del documento actualizado
          res.status(200).json(responseRemove);
        });
    })
    .catch((errorFind) => {
      // Se retorna la respuesta con problemas
      errorTraceRaven(errorFind);
      res.status(404).send({
        error: errorResponse('remove').response,
        errorTrace: errorFind,
      });
    });
};

/**
 * Metodo Update
 * URI: /sii/credential/:id
 * Method: PUT
 */
exports.update = (req, res) => {
  // Se verifica que exista el documento en la coleccion
  SiiCredential.findById(req.params.id)
    .then((responseFind) => {
      // Se verifica que el documento no presente fallas, en caso de contar con fallas se retorna un error
      if (!responseFind) {
        throw new Error();
      }
      // Se genera el documento actualizado para ser actualizado
      const body = Object.assign(responseFind, req.body);
      // Se verifica que exista un parametro de tipo password para ser encriptado
      if (req.body.password) {
        body.password = Cryptr.encrypt(req.body.password);
      }
      // Se verifica que exista un parametro de tipo user para eliminar los puntos en el string
      if (req.body.user) {
        req.body.user = req.body.user.replace(/\./g, '');
      }
      body.logs.updatedAt = new Date();
      // Se verifican las credenciales contra el SII
      getCredentials(body.user, body.password)
        .then(() => {
          // Se procede a actualizar el documento en la coleccion
          SiiCredential.findOneAndUpdate({
            _id: req.params.id,
          }, body, {
            new: true,
          })
            .then((responseUpdate) => {
              // Se retorna la respuesta del documento actualizado
              res.status(200).json(responseUpdate);
            });
        })
        .catch((errorUpdate) => {
          // Se retorna la respuesta con problemas
          errorTraceRaven(errorUpdate);
          res.status(400).send({
            error: errorResponse('update').response,
            errorTrace: errorUpdate,
          });
        });
    })
    .catch((errorFind) => {
      // Se retorna la respuesta con problemas
      errorTraceRaven(errorFind);
      res.status(404).send({
        error: errorResponse('update').response,
        errorTrace: errorFind,
      });
    });
};

/**
 * Metodo Verify
 * URI: /sii/credential/verify
 * Method: POST
 */
exports.verify = (req, res) => {
  // Se verifica que exista un parametro de tipo password para ser encriptado
  if (req.body.password) {
    req.body.password = Cryptr.encrypt(req.body.password);
  }
  // Se verifican las credenciales contra el SII
  getCredentials(req.body.user, req.body.password, true)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        // Se retorna la respuesta de las credenciales verificadas
        res.status(200).json(response);
      } else {
        // Se verifica que el documento no presente fallas, en caso de contar con fallas se retorna un error
        throw new Error();
      }
    })
    .catch((errorGetCredentials) => {
      // Se retorna la respuesta con problemas
      errorTraceRaven(errorGetCredentials);
      res.status(400).json({
        error: errorResponse('create').response,
        errorTrace: {},
      });
    });
};

/**
 * Metodo View
 * URI: /sii/credential/:id
 * Method: GET
 */
exports.view = (req, res) => {
  // Se verifica que exista el documento en la coleccion
  SiiCredential.findById(req.params.id)
    .then((responseFind) => {
      // Se verifica que el documento no presente fallas, en caso de contar con fallas se retorna un error
      if (!responseFind) {
        throw new Error();
      }
      // Se retorna la respuesta del documento encontrado
      res.status(200).json(responseFind);
    })
    .catch((errorFind) => {
      // Se retorna la respuesta con problemas
      errorTraceRaven(errorFind);
      res.status(404).send({
        error: errorResponse('view').response,
        errorTrace: errorFind,
      });
    });
};
