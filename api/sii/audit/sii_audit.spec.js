// Declaracion de dependencias
const { request } = require('../../testing');

// Declaracion de mocks de pruebas
const mocks = require('./sii_audit.mocks');
const { errorResponse } = require('../../../utils/errors');

// Configuracion del contador
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

/**
 * Pruebas del metodo Create
 * URI: /sii/audit
 * Method: POST
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/audit (POST) [siiAudit.create]`, async () => {
    counter += 1;
    await request().post('/sii/audit').send(row)
      .then((response) => {
        if (response.statusCode === 201) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toEqual(null);
          expect(response.body.period).toEqual(row.period);
          expect(response.body.time).toEqual(row.time);
          expect(response.body.type).toEqual(row.type);
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
  }, 10000);
});

/**
 * Prueba del metodo View
 * URI: /sii/audit/:id
 * Method: VIEW
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/audit/:id (GET) [siiAudit.view]`, async () => {
    await request().get(`/sii/audit/${row._id}`)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(response.body.period).toEqual(row.period);
          expect(response.body.time).toEqual(row.time);
          expect(response.body.type).toEqual(row.type);
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
  }, 10000);
});

/**
 * Prueba del metodo Update
 * URI: /sii/audit/:id
 * Method: PUT
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/audit/:id (PUT) [siiAudit.update]`, async () => {
    await request().put(`/sii/audit/${row._id}`).send(row)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(response.body.period).toEqual(row.period);
          expect(response.body.time).toEqual(row.time);
          expect(response.body.type).toEqual(row.type);
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
  }, 10000);
});

/**
 * Prueba del metodo Remove
 * URI: /sii/audit/:id
 * Method: DELETE
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/audit/:id (DELETE) [siiAudit.remove]`, async () => {
    await request().delete(`/sii/audit/${row._id}`)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(!row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(response.body.period).toEqual(row.period);
          expect(response.body.time).toEqual(row.time);
          expect(response.body.type).toEqual(row.type);
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
  }, 10000);
});

/**
 * Prueba del metodo List
 * URI: /sii/audit
 * Method: GET
 */
test(`Prueba ${getCounter()} - Metodo /sii/audit (LIST) [siiAudit.list]`, async () => {
  await request().get('/sii/audit?limit=3&page=1&order=desc&logs=d,t')
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
}, 10000);
test(`Prueba ${getCounter()} - Metodo /sii/audit (LIST) [siiAudit.list]`, async () => {
  await request().get('/sii/audit?limit=5&page=2&order=asc&logs=c,d,t')
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
}, 10000);
test(`Prueba ${getCounter()} - Metodo /sii/audit (LIST) [siiAudit.list]`, async () => {
  await request().get('/sii/audit?short&limit=5&order=asc&logs=a,d,t')
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
}, 10000);
test(`Prueba ${getCounter()} - Metodo /sii/audit (LIST) [siiAudit.list]`, async () => {
  await request().get('/sii/audit?short&order=asc')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(0);
        expect(response.body.paging.limit).toEqual(500);
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
}, 10000);
test(`Prueba ${getCounter()} - Metodo /sii/audit (LIST) [siiAudit.list]`, async () => {
  await request().get('/sii/audit?limit=-1&page=-1&order=asc&notActive')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(0);
        expect(response.body.paging.limit).toEqual(500);
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
}, 10000);
test(`Prueba ${getCounter()} - Metodo /sii/audit (LIST) [siiAudit.list]`, async () => {
  await request().get('/sii/audit?limit=5&page=-1&order=asc&logs=d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(5);
        expect(response.body.paging.limit).toEqual(5);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
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
}, 10000);
test(`Prueba ${getCounter()} - Metodo /sii/audit (LIST) [siiAudit.list]`, async () => {
  await request().get('/sii/audit?limit=-1&page=-1&order=asc&logs=d,t&notActive')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(0);
        expect(response.body.paging.limit).toEqual(500);
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
}, 10000);
test(`Prueba ${getCounter()} - Metodo /sii/audit (LIST) [siiAudit.list]`, async () => {
  await request().get('/sii/audit?limit=3&page=-1&order=asc&logs=d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(3);
        expect(response.body.paging.limit).toEqual(3);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
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
}, 10000);
test(`Prueba ${getCounter()} - Metodo /sii/audit (LIST) [siiAudit.list]`, async () => {
  await request().get('/sii/audit?limit=-2&page=-1&order=asc&logs=d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(6);
        expect(response.body.paging.limit).toEqual(500);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
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
}, 10000);
test(`Prueba ${getCounter()} - Metodo /sii/audit (LIST) [siiAudit.list]`, async () => {
  await request().get('/sii/audit?limit=1&page=-1&order=asc&logs=d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(1);
        expect(response.body.paging.limit).toEqual(1);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
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
}, 10000);
