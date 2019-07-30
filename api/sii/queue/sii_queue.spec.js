// Declaracion de dependencias
const { request } = require('./../../testing');

// Declaracion de mocks de pruebas
const mocks = require('./sii_queue.mocks');
const { errorResponse } = require('./../../../utils/errors');

// Configuracion del contador
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

/**
 * Prueba del metodo Create
 * URI: /sii/queue
 * Method: POST
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/queue (POST) [siiQueue.create]`, async () => {
    counter += 1;
    await request().post('/sii/queue').send(row)
      .then((response) => {
        if (response.statusCode === 201) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.executions).toBeDefined();
          expect(response.body.executions.length).toEqual(row.executions.length);
          if (response.body.executions && Array.isArray(response.body.executions)) {
            response.body.executions.forEach((item, keyItem) => {
              expect(item.code).toEqual(row.executions[keyItem].code);
              expect(item.period).toEqual(row.executions[keyItem].period);
              expect(item.types).toBeDefined();
              if (item.types && Array.isArray(item.types)) {
                item.types.forEach((type, keyType) => {
                  expect(type.code).toEqual(row.executions[keyItem].types[keyType].code);
                  expect(type.count).toEqual(row.executions[keyItem].types[keyType].count);
                });
              }
            });
          }
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toEqual(null);
          expect(response.body.synchronize).toBeDefined();
          expect(response.body.synchronize.date).toEqual(row.synchronize.date);
          expect(response.body.synchronize.period).toEqual(row.synchronize.period);
          expect(response.body.synchronize.status).toEqual(row.synchronize.status);
          expect(response.body.synchronize.type).toEqual(row.synchronize.type);
          expect(response.body.user).toEqual(row.user);
        } else if (response.statusCode === 400) {
          const error = errorResponse('create').response;
          expect(response.body).toBeDefined();
          expect(response.body.error).toBeDefined();
          expect(response.body.error.message).toEqual(error.message);
          expect(response.body.error.status).toEqual(error.status);
          expect(response.body.errorTrace).toBeDefined();
        }
      });
  }, 30000);
});

/**
 * Prueba del metodo View
 * URI: /sii/queue/:id
 * Method: VIEW
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/queue/:id (GET) [siiQueue.view]`, async () => {
    await request().get(`/sii/queue/${row._id}`)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.executions).toBeDefined();
          expect(response.body.executions.length).toEqual(row.executions.length);
          if (response.body.executions && Array.isArray(response.body.executions)) {
            response.body.executions.forEach((item, keyItem) => {
              expect(item.code).toEqual(row.executions[keyItem].code);
              expect(item.period).toEqual(row.executions[keyItem].period);
              expect(item.types).toBeDefined();
              if (item.types && Array.isArray(item.types)) {
                item.types.forEach((type, keyType) => {
                  expect(type.code).toEqual(row.executions[keyItem].types[keyType].code);
                  expect(type.count).toEqual(row.executions[keyItem].types[keyType].count);
                });
              }
            });
          }
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(response.body.synchronize).toBeDefined();
          expect(response.body.synchronize.date).toEqual(row.synchronize.date);
          expect(response.body.synchronize.period).toEqual(row.synchronize.period);
          expect(response.body.synchronize.status).toEqual(row.synchronize.status);
          expect(response.body.synchronize.type).toEqual(row.synchronize.type);
          expect(response.body.user).toEqual(row.user);
        } else if (response.statusCode === 400) {
          const error = errorResponse('view').response;
          expect(response.body).toBeDefined();
          expect(response.body.error).toBeDefined();
          expect(response.body.error.message).toEqual(error.message);
          expect(response.body.error.status).toEqual(error.status);
          expect(response.body.errorTrace).toBeDefined();
        }
      });
  }, 30000);
});

/**
 * Prueba del metodo Update
 * URI: /sii/queue/:id
 * Method: PUT
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/queue/:id (PUT) [siiQueue.update]`, async () => {
    const data = row;
    data.name += ' - Update';
    await request().put(`/sii/queue/${row._id}`).send(data)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.executions).toBeDefined();
          expect(response.body.executions.length).toEqual(row.executions.length);
          if (response.body.executions && Array.isArray(response.body.executions)) {
            response.body.executions.forEach((item, keyItem) => {
              expect(item.code).toEqual(row.executions[keyItem].code);
              expect(item.period).toEqual(row.executions[keyItem].period);
              expect(item.types).toBeDefined();
              if (item.types && Array.isArray(item.types)) {
                item.types.forEach((type, keyType) => {
                  expect(type.code).toEqual(row.executions[keyItem].types[keyType].code);
                  expect(type.count).toEqual(row.executions[keyItem].types[keyType].count);
                });
              }
            });
          }
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(response.body.synchronize).toBeDefined();
          expect(response.body.synchronize.date).toEqual(row.synchronize.date);
          expect(response.body.synchronize.period).toEqual(row.synchronize.period);
          expect(response.body.synchronize.status).toEqual(row.synchronize.status);
          expect(response.body.synchronize.type).toEqual(row.synchronize.type);
          expect(response.body.user).toEqual(row.user);
        } else if (response.statusCode === 400) {
          const error = errorResponse('update').response;
          expect(response.body).toBeDefined();
          expect(response.body.error).toBeDefined();
          expect(response.body.error.message).toEqual(error.message);
          expect(response.body.error.status).toEqual(error.status);
          expect(response.body.errorTrace).toBeDefined();
        }
      });
  }, 30000);
});

/**
 * Prueba del metodo Remove
 * URI: /sii/queue/:id
 * Method: DELETE
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/queue/:id (DELETE) [siiQueue.remove]`, async () => {
    await request().delete(`/sii/queue/${row._id}`)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.executions).toBeDefined();
          expect(response.body.executions.length).toEqual(row.executions.length);
          if (response.body.executions && Array.isArray(response.body.executions)) {
            response.body.executions.forEach((item, keyItem) => {
              expect(item.code).toEqual(row.executions[keyItem].code);
              expect(item.period).toEqual(row.executions[keyItem].period);
              expect(item.types).toBeDefined();
              if (item.types && Array.isArray(item.types)) {
                item.types.forEach((type, keyType) => {
                  expect(type.code).toEqual(row.executions[keyItem].types[keyType].code);
                  expect(type.count).toEqual(row.executions[keyItem].types[keyType].count);
                });
              }
            });
          }
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(!row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(response.body.synchronize).toBeDefined();
          expect(response.body.synchronize.date).toEqual(row.synchronize.date);
          expect(response.body.synchronize.period).toEqual(row.synchronize.period);
          expect(response.body.synchronize.status).toEqual(row.synchronize.status);
          expect(response.body.synchronize.type).toEqual(row.synchronize.type);
          expect(response.body.user).toEqual(row.user);
        } else if (response.statusCode === 400) {
          const error = errorResponse('remove').response;
          expect(response.body).toBeDefined();
          expect(response.body.error).toBeDefined();
          expect(response.body.error.message).toEqual(error.message);
          expect(response.body.error.status).toEqual(error.status);
          expect(response.body.errorTrace).toBeDefined();
        }
      });
  }, 30000);
});

/**
 * Prueba del metodo Sync
 * URI: /sii/queue/sync
 * Method: GET
 */
test(`Prueba ${getCounter()} - Metodo /sii/queue (GET) [siiQueue.sync]`, () => {
  counter += 1;
  request().get('/sii/queue/sync?user=1-1&logs=d,t')
    .then((response) => {
      if (response.statusCode === 201) {
        expect(response.body).toBeDefined();
        expect(response.body.synchronize).toBeDefined();
        expect(response.body.synchronize.date).toBeDefined();
        expect(response.body.user).toEqual('1-1');
      } else if (response.statusCode === 400) {
        const error = errorResponse('view').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (GET) [siiQueue.sync]`, () => {
  counter += 1;
  request().get('/sii/queue/sync?user')
    .then((response) => {
      if (response.statusCode === 201) {
        expect(response.body).toBeDefined();
        expect(response.body.synchronize).toBeDefined();
        expect(response.body.synchronize.date).toBeDefined();
        expect(response.body.user).toEqual('1-1');
      } else if (response.statusCode === 400) {
        const error = errorResponse('view').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (GET) [siiQueue.sync]`, () => {
  counter += 1;
  request().get('/sii/queue/sync?user=1-3&logs=d,t')
    .then((response) => {
      if (response.statusCode === 201) {
        expect(response.body).toBeDefined();
        expect(response.body.synchronize).toBeDefined();
        expect(response.body.synchronize.date).toBeDefined();
        expect(response.body.user).toEqual('1-1');
      } else if (response.statusCode === 400) {
        const error = errorResponse('view').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (GET) [siiQueue.sync]`, () => {
  counter += 1;
  request().get('/sii/queue/sync?user=1-4&logs=c,d,t')
    .then((response) => {
      if (response.statusCode === 201) {
        expect(response.body).toBeDefined();
        expect(response.body.synchronize).toBeDefined();
        expect(response.body.synchronize.date).toBeDefined();
        expect(response.body.user).toEqual('1-1');
      } else if (response.statusCode === 400) {
        const error = errorResponse('view').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (GET) [siiQueue.sync]`, () => {
  counter += 1;
  request().get('/sii/queue/sync?user=1-1')
    .then((response) => {
      if (response.statusCode === 201) {
        expect(response.body).toBeDefined();
        expect(response.body.synchronize).toBeDefined();
        expect(response.body.synchronize.date).toBeDefined();
        expect(response.body.user).toEqual('1-1');
      } else if (response.statusCode === 400) {
        const error = errorResponse('view').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);

/**
 * Prueba del metodo List
 * URI: /sii/queue
 * Method: GET
 */
test(`Prueba ${getCounter()} - Metodo /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=3&page=1&order=desc&logs=d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(3);
        expect(response.body.paging.limit).toEqual(3);
        expect(response.body.paging.order).toEqual('desc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
        expect(response.body.results.length).toEqual(3);
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=5&page=2&order=asc&logs=c,d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(0);
        expect(response.body.paging.limit).toEqual(5);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(2);
        expect(response.body.paging.total).toEqual(0);
        expect(response.body.results.length).toEqual(0);
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?short&limit=5&order=asc&logs=a,d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(5);
        expect(response.body.paging.limit).toEqual(5);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
        expect(response.body.results.length).toEqual(5);
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?short&order=asc')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(0);
        expect(response.body.paging.limit).toEqual(100);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(0);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=-1&page=-1&order=asc')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(0);
        expect(response.body.paging.limit).toEqual(100);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(0);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=5&page=-1&order=asc&logs=d,t&type=a&send')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(3);
        expect(response.body.paging.limit).toEqual(5);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(3);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=-1&page=-1&order=asc&logs=d,t&type=Automatic')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(2);
        expect(response.body.paging.limit).toEqual(100);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(2);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=3&page=-1&order=asc&logs=d,t&type=Automatic')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(2);
        expect(response.body.paging.limit).toEqual(3);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(2);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=-2&page=-1&order=asc&logs=d,t&type=Priority')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(2);
        expect(response.body.paging.limit).toEqual(100);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(2);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=1&page=-1&order=asc&logs=d,t&type=Priority')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(1);
        expect(response.body.paging.limit).toEqual(1);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(2);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
