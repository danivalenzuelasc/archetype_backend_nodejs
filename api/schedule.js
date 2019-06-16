// Declaracion de dependencias
const cryptr = require('cryptr');
const nodeSchedule = require('node-schedule');
const request = require('request-promise');
const settings = require('./../config/settings');
const { documents, synchronization, tokenExpires } = require('./../config/sii');
const { errorTraceRaven } = require('./../utils/general');
const {
  getCredentials, getDocuments, getSummary, mapperDocument,
} = require('./../utils/sii');
const Cryptr = new cryptr(settings.endpoint.crypt);

// Configuracion de la URL del entorno de la API
const apiUrl = process.env.NODE_ENV === 'production' ? `${settings.api}:${settings.port}` : `http://localhost:${settings.port}`;

// Export Schedules
exports.init = () => {
  // Se realiza ejecucion del demonio [cada 10 segundos]
  nodeSchedule.scheduleJob('*/10 * * * * *', () => {
    // Se procede a realizar la llamada para obtener las colas Prioritarias que se deben ejecutar
    getQueue('Priority', 5)
      // Se procede en caso de obtener las colas
      .then((responseQueue) => {
        // Se procede a ejecutar cada cola del listado
        responseQueue.results.forEach((queue) => {
          // Se procede a realizar la llamada para obtener las credenciales del acceso al SII
          getCredential(queue.user)
            // Se procede en caso de obtener las credenciales
            .then((responseCredential) => {
              if (responseCredential.paging.count > 0) {
                // Se procede a generar la estructura con los datos para el procesamiento
                let transaction = {
                  certificate: responseCredential.results[0].certificate,
                  id: responseCredential.results[0]._id,
                  password: responseCredential.results[0].password,
                  queue: queue._id,
                  session: responseCredential.results[0].session,
                  synchronize: queue.synchronize,
                  user: queue.user,
                };
                // Se procede a verificar si se posee el token del SII
                if (transaction.session.token && new Date(transaction.session.expires) > new Date()) {
                  getService(transaction);
                  transaction = null;
                } else {
                  getCredentials(transaction.user, transaction.password, true)
                    // Se procede a verificar si se realizo correctamente el ingreso al SII
                    .then((responseSession) => {
                      if (Object.keys(responseSession).length > 0) {
                        transaction.session.expires = new Date(Date.now() + tokenExpires);
                        transaction.session.token = responseSession.TOKEN;
                        // Se procede a actualizar el token del SII
                        tokenUpdate(transaction)
                          // Se procede a obtener los documentos del periodo tributario correspondiente
                          .then(() => {
                            getService(transaction);
                            transaction = null;
                          })
                          // Se procede a notificar en caso de que se presente algun error al actualizar el token
                          .catch((errorUpdateToken) => {
                            errorTraceRaven(errorUpdateToken);
                            errorUpdateToken = null;
                          });
                      }
                      responseSession = null;
                    })
                    // Se procede a notificar en caso de que se presente algun error al obtener el token
                    .catch((errorSession) => {
                      errorTraceRaven(errorSession);
                      errorSession = null;
                    });
                }
              }
              responseCredential = null;
            })
            // Se procede a notificar en caso de que se presente algun error al obtener las credenciales
            .catch((errorCredential) => {
              errorTraceRaven(errorCredential);
              errorCredential = null;
            });
        });
      })
      // Se procede a notificar en caso de que se presente algun error al obtener las colas
      .catch((errorQueue) => {
        errorTraceRaven(errorQueue);
        errorQueue = null;
      });
  });
  // Se realiza ejecucion del demonio [cada 5 minutos]
  nodeSchedule.scheduleJob('* */5 * * * *', () => {
    // Se procede a realizar la llamada para obtener las colas Automaticas que se deben ejecutar
    getQueue('Automatic', 100)
      // Se procede en caso de obtener las colas
      .then((responseQueue) => {
        // Se procede a ejecutar cada cola del listado
        responseQueue.results.forEach((queue) => {
          // Se procede a realizar la llamada para obtener las credenciales del acceso al SII
          getCredential(queue.user)
            // Se procede en caso de obtener las credenciales
            .then((responseCredential) => {
              if (responseCredential.paging.count > 0) {
                // Se procede a generar la estructura con los datos para el procesamiento
                let transaction = {
                  certificate: responseCredential.results[0].certificate,
                  id: responseCredential.results[0]._id,
                  password: responseCredential.results[0].password,
                  queue: queue._id,
                  session: responseCredential.results[0].session,
                  synchronize: queue.synchronize,
                  user: queue.user,
                };
                // Se procede a verificar si se posee el token del SII
                if (transaction.session.token && new Date(transaction.session.expires) > new Date()) {
                  getService(transaction);
                  transaction = null;
                } else {
                  getCredentials(transaction.user, transaction.password, true)
                    // Se procede a verificar si se realizo correctamente el ingreso al SII
                    .then((responseSession) => {
                      if (Object.keys(responseSession).length > 0) {
                        transaction.session.expires = new Date(Date.now() + tokenExpires);
                        transaction.session.token = responseSession.TOKEN;
                        // Se procede a actualizar el token del SII
                        tokenUpdate(transaction)
                          // Se procede a obtener los documentos del periodo tributario correspondiente
                          .then(() => {
                            getService(transaction);
                            transaction = null;
                          })
                          // Se procede a notificar en caso de que se presente algun error al actualizar el token
                          .catch((errorUpdateToken) => {
                            errorTraceRaven(errorUpdateToken);
                            errorUpdateToken = null;
                          });
                      } else {
                        // Se procede a detener la cola de ejecucion
                        queueStop(transaction.queue)
                          // Se procede a notificar la detencion de la cola de ejecucion
                          .then(() => {
                            connectAPIFacturaQueue(transaction.queue);
                            transaction = null;
                          })
                          // Se procede a notificar en caso de que se presente algun error al notificar la detencion de la cola de ejecucion
                          .catch((errorQueueStop) => {
                            errorTraceRaven(errorQueueStop);
                            errorQueueStop = null;
                          });
                      }
                      responseSession = null;
                    })
                    // Se procede a notificar en caso de que se presente algun error al obtener el token
                    .catch((errorSession) => {
                      errorTraceRaven(errorSession);
                      errorSession = null;
                    });
                }
              }
              responseCredential = null;
            })
            // Se procede a notificar en caso de que se presente algun error al obtener las credenciales
            .catch((errorCredential) => {
              errorTraceRaven(errorCredential);
              errorCredential = null;
            });
        });
      })
      // Se procede a notificar en caso de que se presente algun error al obtener las colas
      .catch((errorQueue) => {
        errorTraceRaven(errorQueue);
        errorQueue = null;
      });
  });
};

/**
 * Function connectAPIFacturaDocument
 * Parametros de entrada
 * document => Documento a guardar en la base de datos
 * method => ['POST', 'PUT']
*/
function connectAPIFacturaDocument(document, method) {
  // Configuramos la peticion de la llamada de sincronizacion de documentos
  let options = {
    body: document,
    headers: {
      'Content-Type': 'application/json',
    },
    json: true,
    method,
    resolveWithFullResponse: true,
    uri: synchronization.document,
  };
  request(options)
    // Se procede a enviar la respuesta de la sincronizacion del documento
    .then(() => {})
    // Se procede a notificar en caso de que se presente algun error al sincronizar los documentos
    .catch((error) => {
      errorTraceRaven(error);
      error = null;
    })
    // Se procede a eliminar las variables temporales de la ejecucion
    .finally(() => {
      document = method = options = null;
    });
}

/**
 * Function connectAPIFacturaQueue
 * Parametros de entrada
 * queueId => Identificador de la cola
*/
function connectAPIFacturaQueue(queue) {
  // Configuramos la peticion de la llamada de sincronizacion de colas
  let options = {
    body: {
      queueId: queue,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    json: true,
    method: 'POST',
    resolveWithFullResponse: true,
    uri: synchronization.queue,
  };
  request(options)
    // Se procede a enviar la respuesta de la sincronizacion de la cola
    .then(() => {})
    // Se procede a notificar en caso de que se presente algun error al sincronizar los colas
    .catch((error) => {
      errorTraceRaven(error);
      error = null;
    })
    // Se procede a eliminar las variables temporales de la ejecucion
    .finally(() => {
      options = queue = null;
    });
}

/**
 * Function documentCreate
 * Parametros de entrada
 * document => Documento a guardar en la base de datos
*/
function documentCreate(document) {
  // Configuramos la peticion de la llamada de creacion de un documento
  const options = {
    body: document,
    headers: {
      'Content-Type': 'application/json',
    },
    json: true,
    method: 'POST',
    resolveWithFullResponse: true,
    uri: `${apiUrl}/sii/document`,
  };
  request(options)
    // Se procede a enviar la respuesta de la creacion del documento
    .then((response) => {
      connectAPIFacturaDocument(response, 'POST');
    })
    // Se procede a notificar en caso de que se presente algun error al crear un documento
    .catch((error) => {
      errorTraceRaven(error);
      documentCreate(document);
      error = null;
    });
}

/**
 * Function documentUpdate
 * Parametros de entrada
 * document => Documento a actualizar en la base de datos
*/
/*
function documentUpdate(document) {
  // Configuramos la peticion de la llamada de actualizacion de un documento
  const options = {
    body: document,
    headers: {
      'Content-Type': 'application/json',
    },
    json: true,
    method: 'PUT',
    resolveWithFullResponse: true,
    uri: `${apiUrl}/sii/document/${document._id}`,
  };
  request(options)
    // Se procede a enviar la respuesta de la actualizacion del documento
    .then((response) => {
      connectAPIFacturaDocument(response, 'PUT');
    })
    // Se procede a notificar en caso de que se presente algun error al actualizar un documento
    .catch((error) => {
      errorTraceRaven(error);
      documentCreate(document);
      error = null;
    });
}
*/

/**
 * Function getCredential
 * Parametros de entrada
 * user => RUT formato 12.345.678-9
*/
function getCredential(user) {
  return new Promise((resolve, reject) => {
    // Configuramos la peticion de la llamada de obtencion de una credencial
    const options = {
      body: {},
      headers: {
        'Content-Type': 'application/json',
      },
      json: true,
      method: 'GET',
      resolveWithFullResponse: true,
      uri: `${apiUrl}/sii/credential?user=${user}`,
    };
    request(options)
      // Se procede a enviar la respuesta de la obtencion de la credencial
      .then((response) => {
        resolve(response.body);
      })
      // Se procede a notificar en caso de que se presente algun error al obtener la credencial
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Function getQueue
 * Parametros de entrada
 * type => ['Priority', 'Manual']
 * limit => [1 ... 500]
*/
function getQueue(type, limit) {
  return new Promise((resolve, reject) => {
    // Obtenemos el listado de la cola a procesar segun el tipo
    let options = {
      body: {},
      headers: {
        'Content-Type': 'application/json',
      },
      json: true,
      method: 'GET',
      resolveWithFullResponse: true,
      uri: `${apiUrl}/sii/queue?limit=${limit}&page=1&order=asc&type=${type}`,
    };
    request(options)
      // Se procede a enviar la respuesta de la obtencion de la cola
      .then((response) => {
        resolve(response.body);
        response = null;
      })
      // Se procede a notificar en caso de que se presente algun error al obtener la cola
      .catch((error) => {
        reject(error);
        error = null;
      })
      // Se procede a eliminar las variables temporales de la ejecucion
      .finally(() => {
        options = limit = type = null;
      });
  });
}

/**
 * Function getService
 * Parametros de entrada
 * type => ['Priority', 'Manual']
 * limit => [1 ... 500]
*/
function getService(transaction) {
  const now = new Date();
  let month;
  let period;
  let typeSync = 'Automatic';
  let year;
  // Se procede a verificar que tipo de procesamiento corresponde la cola
  if (transaction.synchronize.period) {
    ({ period } = transaction.synchronize);
    month = parseInt(period.substr(4, 5), 10);
    year = parseInt(period.substr(0, 4), 10);
    typeSync = now.getFullYear() >= year && now.getMonth() + 1 > month ? 'Priority' : 'Automatic';
  } else {
    month = now.getMonth() + 1;
    year = now.getFullYear();
  }
  // Se procede a actualizar la cola en caso de cambiar la prioridad
  synchronizeUpdate(transaction, month < 12 ? year : year + 1, month < 12 ? month + 1 : 0, typeSync)
    // Se procede a recorrer los tipos de documentos de Compra y Venta que se necesitan
    .then(() => {
      documents.forEach((document) => {
        document.list.forEach((row) => {
          // Se procede a obtener la cantidad de documentos de un tipo de operacion
          getSummary(transaction, {
            operation: document.key,
            state: row,
            url: document.url,
          }, year, month < 10 ? `${0}${month}` : month)
            .then((responseGetService) => {
              responseGetService.forEach((type) => {
                // Se procede a obtener los documentos de un tipo de operacion
                getDocuments(transaction, {
                  document: String(type.rsmnTipoDocInteger),
                  operation: document.key,
                  state: row,
                  url: document.url,
                }, year, month < 10 ? `${0}${month}` : month)
                  .then((responseGetDocuments) => {
                    if (Array.isArray(responseGetDocuments)) {
                      responseGetDocuments.forEach((rowDocument) => {
                        // Se procede a procesar el documento obtenido
                        documentCreate(mapperDocument(rowDocument, type.rsmnTipoDocInteger, document.key, transaction.user, transaction.queue));
                      });
                    }
                  });
              });
            });
        });
      });
    })
    // Se procede a notificar en caso de que se presente algun error al actualizar la sincronizacion
    .catch((errorSynchronizeUpdate) => {
      errorTraceRaven(errorSynchronizeUpdate);
    });
}

/**
 * Function synchronizeUpdate
 * Parametros de entrada
 * transaction => Objeto completo del servicio API /queue/:id
 * year => yyyy
 * month => mm
 * type => ['Automatic', 'Priority']
*/
function queueStop(queueId) {
  return new Promise((resolve, reject) => {
    // Actualizamos la cola de sincronizacion
    let options = {
      body: {
        active: false,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      json: true,
      method: 'PUT',
      resolveWithFullResponse: true,
      uri: `${apiUrl}/sii/queue/${queueId}`,
    };
    request(options)
      // Se procede a enviar la respuesta de la actualizacion de la sincronizacion
      .then(() => {
        resolve();
      })
      // Se procede a notificar en caso de que se presente algun error al actualizar la sincronizacion
      .catch((error) => {
        reject(error);
        error = null;
      })
      // Se procede a eliminar las variables temporales de la ejecucion
      .finally(() => {
        options = queueId = null;
      });
  });
}

/**
 * Function synchronizeUpdate
 * Parametros de entrada
 * transaction => Objeto completo del servicio API /queue/:id
 * year => yyyy
 * month => mm
 * type => ['Automatic', 'Priority']
*/
function synchronizeUpdate(transaction, year, month, type = 'Automatic') {
  return new Promise((resolve, reject) => {
    // Actualizamos la cola de sincronizacion
    let options = {
      body: {
        synchronize: {
          date: new Date(),
          period: type !== 'Automatic' ? `${year}${month < 10 ? `${0}${month}` : month}` : null,
          type,
        },
      },
      headers: {
        'Content-Type': 'application/json',
      },
      json: true,
      method: 'PUT',
      resolveWithFullResponse: true,
      uri: `${apiUrl}/sii/queue/${transaction.queue}`,
    };
    request(options)
      // Se procede a enviar la respuesta de la actualizacion de la sincronizacion
      .then(() => {
        resolve();
      })
      // Se procede a notificar en caso de que se presente algun error al actualizar la sincronizacion
      .catch((error) => {
        reject(error);
        error = null;
      })
      // Se procede a eliminar las variables temporales de la ejecucion
      .finally(() => {
        month = options = transaction = type = year = null;
      });
  });
}

/**
 * Function tokenUpdate
 * Parametros de entrada
 * credential => Objeto completo del servicio API /credential
*/
function tokenUpdate(credential) {
  return new Promise((resolve, reject) => {
    // Se desencripta la clave protegida
    credential.password = Cryptr.decrypt(credential.password);
    // Actualizamos el token de la credencial obtenida
    let options = {
      body: credential,
      headers: {
        'Content-Type': 'application/json',
      },
      json: true,
      method: 'PUT',
      resolveWithFullResponse: true,
      uri: `${apiUrl}/sii/credential/${credential.id}`,
    };
    request(options)
      // Se procede a enviar la respuesta de la actualizacion del token
      .then((response) => {
        resolve(response.body);
        response = null;
      })
      // Se procede a notificar en caso de que se presente algun error al actualizar el token
      .catch((error) => {
        reject(error);
        error = null;
      })
      // Se procede a eliminar las variables temporales de la ejecucion
      .finally(() => {
        credential = options = null;
      });
  });
}
