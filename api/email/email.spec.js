// Declare dependencies
const { request } = require('./../testing');

// Declare mocks spec
const mocks = require('./email.mocks');
const { errorResponse } = require('./../../utils/errors');

// Setting counter
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

// Run testing
describe('Testing Endpoint /email', async () => {
  /*  Testing method Create
   *  URI: /email
   *  Method: POST
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /email (POST) [email.create]`, async () => {
      counter += 1;
      await request().post('/email').send(row)
        .then((response) => {
          if (response.statusCode === 201) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.email).toEqual(row.email);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.primary).toEqual(row.primary);
            expect(response.body.validation).toEqual(row.validation);
          } else if (response.statusCode === 400) {
            const error = errorResponse('create').response;
            expect(response.body).toBeDefined();
            expect(response.body.message).toEqual(error.message);
            expect(response.body.status).toEqual(error.status);
          }
        });
    }, 10000);
  });

  /*  Testing method View
   *  URI: /email/:id
   *  Method: VIEW
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /email/:id (GET) [email.view]`, async () => {
      await request().get(`/email/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.email).toEqual(row.email);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.primary).toEqual(row.primary);
            expect(response.body.validation).toEqual(row.validation);
          } else if (response.statusCode === 400) {
            const error = errorResponse('view').response;
            expect(response.body).toBeDefined();
            expect(response.body.message).toEqual(error.message);
            expect(response.body.status).toEqual(error.status);
          }
        });
    }, 10000);
  });

  /*  Testing method Update
   *  URI: /email/:id
   *  Method: PUT
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /email/:id (PUT) [email.update]`, async () => {
      const data = row;
      data.name += ' - Update';
      await request().put(`/email/${row._id}`).send(data)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.email).toEqual(row.email);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.logs.updatedAt).toBeDefined();
            expect(response.body.primary).toEqual(row.primary);
            expect(response.body.validation).toEqual(row.validation);
          } else if (response.statusCode === 400) {
            const error = errorResponse('update').response;
            expect(response.body).toBeDefined();
            expect(response.body.message).toEqual(error.message);
            expect(response.body.status).toEqual(error.status);
          }
        });
    }, 10000);
  });

  /*  Testing method Remove
   *  URI: /email/:id
   *  Method: DELETE
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /email/:id (DELETE) [email.remove]`, async () => {
      await request().delete(`/email/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.email).toEqual(row.email);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(true);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.logs.updatedAt).toBeDefined();
            expect(response.body.primary).toEqual(row.primary);
            expect(response.body.validation).toEqual(row.validation);
          } else if (response.statusCode === 400) {
            const error = errorResponse('remove').response;
            expect(response.body).toBeDefined();
            expect(response.body.message).toEqual(error.message);
            expect(response.body.status).toEqual(error.status);
          }
        });
    }, 10000);
  });

  /*  Testing method List
   *  URI: /email
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /email (LIST) [email.list]`, async () => {
    await request().get('/email?limit=3&page=1&order=desc&logs=d,t')
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
          expect(response.body.message).toEqual(error.message);
          expect(response.body.status).toEqual(error.status);
        }
      });
  }, 10000);
  test(`Testing ${getCounter()} - Method /email (LIST) [email.list]`, async () => {
    await request().get('/email?limit=5&page=2&order=asc&logs=c,d,t')
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
          expect(response.body.message).toEqual(error.message);
          expect(response.body.status).toEqual(error.status);
        }
      });
  }, 10000);
  test(`Testing ${getCounter()} - Method /email (LIST) [email.list]`, async () => {
    await request().get('/email?short&limit=5&order=asc&logs=a,d,t')
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
          expect(response.body.message).toEqual(error.message);
          expect(response.body.status).toEqual(error.status);
        }
      });
  }, 10000);
  test(`Testing ${getCounter()} - Method /email (LIST) [email.list]`, async () => {
    await request().get('/email?short&order=asc')
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.paging.count).toBeDefined();
          expect(response.body.paging.limit).toEqual(500);
          expect(response.body.paging.order).toEqual('asc');
          expect(response.body.paging.page).toEqual(1);
          expect(response.body.paging.total).toBeDefined();
          expect(response.body.results).toBeDefined();
        } else if (response.statusCode === 400) {
          const error = errorResponse('list').response;
          expect(response.body).toBeDefined();
          expect(response.body.message).toEqual(error.message);
          expect(response.body.status).toEqual(error.status);
        }
      });
  }, 10000);
  test(`Testing ${getCounter()} - Method /email (LIST) [email.list]`, async () => {
    await request().get('/email?limit=-1&page=-1&order=asc')
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.paging.count).toBeDefined();
          expect(response.body.paging.limit).toEqual(500);
          expect(response.body.paging.order).toEqual('asc');
          expect(response.body.paging.page).toEqual(1);
          expect(response.body.paging.total).toBeDefined();
          expect(response.body.results).toBeDefined();
        } else if (response.statusCode === 400) {
          const error = errorResponse('list').response;
          expect(response.body).toBeDefined();
          expect(response.body.message).toEqual(error.message);
          expect(response.body.status).toEqual(error.status);
        }
      });
  }, 10000);

  /*  Testing method Search
   *  URI: /email/search
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /email/search (SEARCH) [email.search]`, async () => {
    await request().get('/email/search?text=email01@domain.com&limit=3&page=1&logs=d,t')
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.paging.count).toEqual(3);
          expect(response.body.paging.limit).toEqual(3);
          expect(response.body.paging.page).toEqual(1);
          expect(response.body.paging.total).toEqual(6);
          expect(response.body.results.length).toEqual(3);
        } else if (response.statusCode === 400) {
          const error = errorResponse('list').response;
          expect(response.body).toBeDefined();
          expect(response.body.message).toEqual(error.message);
          expect(response.body.status).toEqual(error.status);
        }
      });
  }, 10000);
  test(`Testing ${getCounter()} - Method /email/search (SEARCH) [email.search]`, async () => {
    await request().get('/email/search?limit=-1&page=-1&logs=d,t')
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.paging.count).toEqual(0);
          expect(response.body.paging.limit).toEqual(500);
          expect(response.body.paging.page).toEqual(1);
          expect(response.body.paging.total).toEqual(0);
          expect(response.body.results.length).toEqual(0);
        } else if (response.statusCode === 400) {
          const error = errorResponse('list').response;
          expect(response.body).toBeDefined();
          expect(response.body.message).toEqual(error.message);
          expect(response.body.status).toEqual(error.status);
        }
      });
  }, 10000);
  test(`Testing ${getCounter()} - Method /email/search (SEARCH) [email.search]`, async () => {
    await request().get('/email/search?text=email02@domain.com&limit=4&logs=a,d,t')
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.paging.count).toEqual(4);
          expect(response.body.paging.limit).toEqual(4);
          expect(response.body.paging.page).toEqual(1);
          expect(response.body.paging.total).toEqual(6);
          expect(response.body.results.length).toEqual(4);
        } else if (response.statusCode === 400) {
          const error = errorResponse('list').response;
          expect(response.body).toBeDefined();
          expect(response.body.message).toEqual(error.message);
          expect(response.body.status).toEqual(error.status);
        }
      });
  }, 10000);
  test(`Testing ${getCounter()} - Method /email/search (SEARCH) [email.search]`, async () => {
    await request().get('/email/search?text=Name 01')
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.paging.count).toBeDefined();
          expect(response.body.paging.limit).toEqual(500);
          expect(response.body.paging.page).toEqual(1);
          expect(response.body.paging.total).toBeDefined();
          expect(response.body.results).toBeDefined();
        } else if (response.statusCode === 400) {
          const error = errorResponse('list').response;
          expect(response.body).toBeDefined();
          expect(response.body.message).toEqual(error.message);
          expect(response.body.status).toEqual(error.status);
        }
      });
  }, 10000);
  test(`Testing ${getCounter()} - Method /email/search (SEARCH) [email.search]`, async () => {
    await request().get('/email/search?text=01&logs=c,d,t')
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.paging.count).toBeDefined();
          expect(response.body.paging.limit).toEqual(500);
          expect(response.body.paging.page).toEqual(1);
          expect(response.body.paging.total).toBeDefined();
          expect(response.body.results).toBeDefined();
        } else if (response.statusCode === 400) {
          const error = errorResponse('list').response;
          expect(response.body).toBeDefined();
          expect(response.body.message).toEqual(error.message);
          expect(response.body.status).toEqual(error.status);
        }
      });
  }, 10000);
});
