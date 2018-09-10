// Declare dependencies
const { request } = require('./../testing');

// Declare mocks spec
const mocks = require('./language.mocks');
const { errorResponse } = require('./../../utils/errors');

// Setting counter
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

// Run testing
describe('Testing Endpoint /language', async () => {
  /*  Testing method Create
   *  URI: /language
   *  Method: POST
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /language (POST) [language.create]`, async () => {
      counter += 1;
      await request().post('/language').send(row)
        .then((response) => {
          if (response.statusCode === 201) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.code).toEqual(row.code);
            expect(response.body.image).toEqual(row.image);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.name).toEqual(row.name);
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
   *  URI: /language/:id
   *  Method: VIEW
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /language/:id (GET) [language.view]`, async () => {
      await request().get(`/language/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.code).toEqual(row.code);
            expect(response.body.image).toEqual(row.image);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.name).toEqual(row.name);
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
   *  URI: /language/:id
   *  Method: PUT
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /language/:id (PUT) [language.update]`, async () => {
      const data = row;
      data.name += ' - Update';
      await request().put(`/language/${row._id}`).send(data)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.code).toEqual(row.code);
            expect(response.body.image).toEqual(row.image);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.logs.updatedAt).toBeDefined();
            expect(response.body.name).toEqual(row.name);
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
   *  URI: /language/:id
   *  Method: DELETE
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /language/:id (DELETE) [language.remove]`, async () => {
      await request().delete(`/language/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.code).toEqual(row.code);
            expect(response.body.image).toEqual(row.image);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(true);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.logs.updatedAt).toBeDefined();
            expect(response.body.name).toEqual(row.name);
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
   *  URI: /language
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /language (LIST) [language.list]`, async () => {
    await request().get('/language?limit=3&page=1&order=desc&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /language (LIST) [language.list]`, async () => {
    await request().get('/language?limit=5&page=2&order=asc&logs=c,d,t')
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
  test(`Testing ${getCounter()} - Method /language (LIST) [language.list]`, async () => {
    await request().get('/language?short&limit=5&order=asc&logs=a,d,t')
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
  test(`Testing ${getCounter()} - Method /language (LIST) [language.list]`, async () => {
    await request().get('/language?short&order=asc')
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
  test(`Testing ${getCounter()} - Method /language (LIST) [language.list]`, async () => {
    await request().get('/language?limit=-1&page=-1&order=asc')
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
   *  URI: /language/search
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /language/search (SEARCH) [language.search]`, async () => {
    await request().get('/language/search?text=Name&limit=3&page=1&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /language/search (SEARCH) [language.search]`, async () => {
    await request().get('/language/search?limit=-1&page=-1&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /language/search (SEARCH) [language.search]`, async () => {
    await request().get('/language/search?text=Name&limit=4&logs=a,d,t')
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
  test(`Testing ${getCounter()} - Method /language/search (SEARCH) [language.search]`, async () => {
    await request().get('/language/search?text=Name 01')
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
  test(`Testing ${getCounter()} - Method /language/search (SEARCH) [language.search]`, async () => {
    await request().get('/language/search?text=01&logs=c,d,t')
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
