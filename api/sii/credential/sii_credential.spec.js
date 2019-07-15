// Declaracion de dependencias
const cryptr = require('cryptr');
const settings = require('./../../../config/settings');
const { request } = require('../../testing');
const { users } = require('./../../../config/sii');

// Declaracion de mocks de pruebas
const mocks = require('./sii_credential.mocks');
const { errorResponse } = require('../../../utils/errors');

// Declaracion de variables auxiliares
const Cryptr = new cryptr(settings.endpoint.crypt);

// Configuracion del contador
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

/**
 * Pruebas del metodo Create
 * URI: /sii/credential
 * Method: POST
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/credential (POST) [siiCredential.create]`, async () => {
    counter += 1;
    await request().post('/sii/credential').send(row)
      .then((response) => {
        if (response.statusCode === 201) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.certificate).toEqual(row.certificate);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toEqual(null);
          expect(Cryptr.decrypt(response.body.password)).toEqual(row.password);
          expect(response.body.session).toBeDefined();
          expect(response.body.session.expires).toEqual(row.session.expires);
          expect(response.body.session.token).toEqual(row.session.token);
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
 * URI: /sii/credential/:id
 * Method: VIEW
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/credential/:id (GET) [siiCredential.view]`, async () => {
    await request().get(`/sii/credential/${row._id}`)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.certificate).toEqual(row.certificate);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(Cryptr.decrypt(response.body.password)).toEqual(row.password);
          expect(response.body.session).toBeDefined();
          expect(response.body.session.expires).toEqual(row.session.expires);
          expect(response.body.session.token).toEqual(row.session.token);
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
 * URI: /sii/credential/:id
 * Method: PUT
 */
mocks.forEach(async (row, key) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/credential/:id (PUT) [siiCredential.update]`, async () => {
    const data = row;
    data.password += ' - Update';
    if (key === 5) {
      data.password = null;
      delete data.user;
    }
    await request().put(`/sii/credential/${row._id}`).send(data)
      .then((response) => {
        if (response.statusCode === 200) {
          const password = Cryptr.decrypt(response.body.password);
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.certificate).toEqual(row.certificate);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(password).toEqual(row.password);
          expect(response.body.session).toBeDefined();
          expect(response.body.session.expires).toEqual(row.session.expires);
          expect(response.body.session.token).toEqual(row.session.token);
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
 * URI: /sii/credential/:id
 * Method: DELETE
 */
mocks.forEach(async (row, key) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/credential/:id (DELETE) [siiCredential.remove]`, async () => {
    await request().delete(`/sii/credential/${row._id}`)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.certificate).toEqual(row.certificate);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(!row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          if (key !== 5) {
            expect(Cryptr.decrypt(response.body.password)).toEqual(row.password);
            expect(response.body.user).toEqual(row.user);
          } else {
            expect(null).toEqual(row.password);
            expect(undefined).toEqual(row.user);
          }
          expect(response.body.session).toBeDefined();
          expect(response.body.session.expires).toEqual(row.session.expires);
          expect(response.body.session.token).toEqual(row.session.token);
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
 * Prueba del metodo Verify
 * URI: /sii/credential/verify
 * Method: POST
 */
test(`Prueba ${getCounter()} - Metodo /sii/credential/verify (VERIFY) [siiCredential.verify]`, async () => {
  await request().post('/sii/credential/verify').send({
    password: 'password01',
    production: true,
    user: 'user01',
  })
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
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
test(`Prueba ${getCounter()} - Metodo /sii/credential/verify (VERIFY) [siiCredential.verify]`, async () => {
  await request().post('/sii/credential/verify').send({
    production: true,
    user: 'user02',
  })
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
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
test(`Prueba ${getCounter()} - Metodo /sii/credential/verify (VERIFY) [siiCredential.verify]`, async () => {
  await request().post('/sii/credential/verify').send({
    password: 'password03',
    user: 'user03',
  })
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
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
test(`Prueba ${getCounter()} - Metodo /sii/credential/verify (VERIFY) [siiCredential.verify]`, async () => {
  await request().post('/sii/credential/verify').send({
    password: Cryptr.decrypt(users[0].password),
    production: true,
    user: Cryptr.decrypt(users[0].user),
  })
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
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
test(`Prueba ${getCounter()} - Metodo /sii/credential/verify (VERIFY) [siiCredential.verify]`, async () => {
  await request().post('/sii/credential/verify').send({
    password: Cryptr.decrypt(users[2].password),
    production: true,
    user: Cryptr.decrypt(users[2].user),
  })
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
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

/**
 * Prueba del metodo List
 * URI: /sii/credential
 * Method: GET
 */
test(`Prueba ${getCounter()} - Metodo /sii/credential (LIST) [siiCredential.list]`, async () => {
  await request().get('/sii/credential?limit=3&page=1&order=desc&logs=d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(3);
        expect(response.body.paging.limit).toEqual(3);
        expect(response.body.paging.order).toEqual('desc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(5);
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
test(`Prueba ${getCounter()} - Metodo /sii/credential (LIST) [siiCredential.list]`, async () => {
  await request().get('/sii/credential?limit=5&page=2&order=asc&logs=c,d,t')
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
test(`Prueba ${getCounter()} - Metodo /sii/credential (LIST) [siiCredential.list]`, async () => {
  await request().get('/sii/credential?short&limit=5&order=asc&logs=a,d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(5);
        expect(response.body.paging.limit).toEqual(5);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(5);
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
test(`Prueba ${getCounter()} - Metodo /sii/credential (LIST) [siiCredential.list]`, async () => {
  await request().get('/sii/credential?short&order=asc')
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
test(`Prueba ${getCounter()} - Metodo /sii/credential (LIST) [siiCredential.list]`, async () => {
  await request().get('/sii/credential?limit=-1&page=-1&order=asc&notActive')
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
test(`Prueba ${getCounter()} - Metodo /sii/credential (LIST) [siiCredential.list]`, async () => {
  await request().get('/sii/credential?limit=5&page=-1&order=asc&logs=d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(5);
        expect(response.body.paging.limit).toEqual(5);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(5);
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
test(`Prueba ${getCounter()} - Metodo /sii/credential (LIST) [siiCredential.list]`, async () => {
  await request().get('/sii/credential?limit=-1&page=-1&order=asc&logs=d,t&notActive')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(1);
        expect(response.body.paging.limit).toEqual(500);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(1);
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
test(`Prueba ${getCounter()} - Metodo /sii/credential (LIST) [siiCredential.list]`, async () => {
  await request().get('/sii/credential?limit=3&page=-1&order=asc&logs=d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(3);
        expect(response.body.paging.limit).toEqual(3);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(5);
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
test(`Prueba ${getCounter()} - Metodo /sii/credential (LIST) [siiCredential.list]`, async () => {
  await request().get('/sii/credential?limit=-2&page=-1&order=asc&logs=d,t&user=1-3')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(1);
        expect(response.body.paging.limit).toEqual(500);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(1);
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
test(`Prueba ${getCounter()} - Metodo /sii/credential (LIST) [siiCredential.list]`, async () => {
  await request().get('/sii/credential?limit=1&page=-1&order=asc&logs=d,t&user=1-2')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(1);
        expect(response.body.paging.limit).toEqual(1);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(1);
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

/**
 * Prueba del metodo Remove
 * URI: /sii/credential/:id
 * Method: DELETE
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/credential/:id (DELETE) [siiCredential.remove]`, async () => {
    await request().delete(`/sii/credential/delete/${row.user}`)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toEqual({});
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
