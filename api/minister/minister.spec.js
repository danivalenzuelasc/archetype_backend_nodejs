// Declare dependencies
const { request } = require('./../testing');

// Declare mocks spec
const mocks = require('./minister.mocks');
const { errorResponse } = require('./../../utils/errors');

// Setting counter
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

// Run testing
describe('Testing Endpoint /minister', async () => {
  /*  Testing method Create
   *  URI: /minister
   *  Method: POST
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /minister (POST) [status.create]`, async () => {
      counter += 1;
      await request().post('/minister').send(row)
        .then((response) => {
          if (response.statusCode === 201) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.code).toEqual(row.code);
            expect(response.body.description).toEqual(row.description);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.name).toEqual(row.name);
            expect(response.body.sacraments).toBeDefined();
            expect(response.body.sacraments.anointingOfTheSick).toEqual(row.sacraments.anointingOfTheSick);
            expect(response.body.sacraments.baptism).toEqual(row.sacraments.baptism);
            expect(response.body.sacraments.confirmation).toEqual(row.sacraments.confirmation);
            expect(response.body.sacraments.eucharist).toEqual(row.sacraments.eucharist);
            expect(response.body.sacraments.holyOrders).toEqual(row.sacraments.holyOrders);
            expect(response.body.sacraments.marriage).toEqual(row.sacraments.marriage);
            expect(response.body.sacraments.reconciliation).toEqual(row.sacraments.reconciliation);
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
   *  URI: /minister/:id
   *  Method: VIEW
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /minister/:id (GET) [status.view]`, async () => {
      await request().get(`/minister/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.code).toEqual(row.code);
            expect(response.body.description).toEqual(row.description);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.name).toEqual(row.name);
            expect(response.body.sacraments).toBeDefined();
            expect(response.body.sacraments.anointingOfTheSick).toEqual(row.sacraments.anointingOfTheSick);
            expect(response.body.sacraments.baptism).toEqual(row.sacraments.baptism);
            expect(response.body.sacraments.confirmation).toEqual(row.sacraments.confirmation);
            expect(response.body.sacraments.eucharist).toEqual(row.sacraments.eucharist);
            expect(response.body.sacraments.holyOrders).toEqual(row.sacraments.holyOrders);
            expect(response.body.sacraments.marriage).toEqual(row.sacraments.marriage);
            expect(response.body.sacraments.reconciliation).toEqual(row.sacraments.reconciliation);
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
   *  URI: /minister/:id
   *  Method: PUT
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /minister/:id (PUT) [status.update]`, async () => {
      const data = row;
      data.name += ' - Update';
      await request().put(`/minister/${row._id}`).send(data)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.code).toEqual(row.code);
            expect(response.body.description).toEqual(row.description);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.logs.updatedAt).toBeDefined();
            expect(response.body.name).toEqual(row.name);
            expect(response.body.sacraments).toBeDefined();
            expect(response.body.sacraments.anointingOfTheSick).toEqual(row.sacraments.anointingOfTheSick);
            expect(response.body.sacraments.baptism).toEqual(row.sacraments.baptism);
            expect(response.body.sacraments.confirmation).toEqual(row.sacraments.confirmation);
            expect(response.body.sacraments.eucharist).toEqual(row.sacraments.eucharist);
            expect(response.body.sacraments.holyOrders).toEqual(row.sacraments.holyOrders);
            expect(response.body.sacraments.marriage).toEqual(row.sacraments.marriage);
            expect(response.body.sacraments.reconciliation).toEqual(row.sacraments.reconciliation);
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
   *  URI: /minister/:id
   *  Method: DELETE
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /minister/:id (DELETE) [status.remove]`, async () => {
      await request().delete(`/minister/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.code).toEqual(row.code);
            expect(response.body.description).toEqual(row.description);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(true);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.logs.updatedAt).toBeDefined();
            expect(response.body.name).toEqual(row.name);
            expect(response.body.sacraments).toBeDefined();
            expect(response.body.sacraments.anointingOfTheSick).toEqual(row.sacraments.anointingOfTheSick);
            expect(response.body.sacraments.baptism).toEqual(row.sacraments.baptism);
            expect(response.body.sacraments.confirmation).toEqual(row.sacraments.confirmation);
            expect(response.body.sacraments.eucharist).toEqual(row.sacraments.eucharist);
            expect(response.body.sacraments.holyOrders).toEqual(row.sacraments.holyOrders);
            expect(response.body.sacraments.marriage).toEqual(row.sacraments.marriage);
            expect(response.body.sacraments.reconciliation).toEqual(row.sacraments.reconciliation);
          } else if (response.statusCode === 400) {
            const error = errorResponse('remove').response;
            expect(response.body).toBeDefined();
            expect(response.body.message).toEqual(error.message);
          }
        });
    }, 10000);
  });

  /*  Testing method Listing
   *  URI: /minister
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /minister (LIST) [status.list]`, async () => {
    await request().get('/minister?limit=3&page=1&order=desc&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /minister (LIST) [status.list]`, async () => {
    await request().get('/minister?limit=5&page=2&order=asc&logs=c,d,t')
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
  test(`Testing ${getCounter()} - Method /minister (LIST) [status.list]`, async () => {
    await request().get('/minister?short&limit=5&order=asc&logs=a,d,t')
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
  test(`Testing ${getCounter()} - Method /minister (LIST) [status.list]`, async () => {
    await request().get('/minister?short&order=asc')
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
  test(`Testing ${getCounter()} - Method /minister (LIST) [status.list]`, async () => {
    await request().get('/minister?limit=-1&page=-1&order=asc')
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
   *  URI: /minister/search
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /minister/search (SEARCH) [minister.search]`, async () => {
    await request().get('/minister/search?text=Name&limit=3&page=1&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /minister/search (SEARCH) [minister.search]`, async () => {
    await request().get('/minister/search?limit=-1&page=-1&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /minister/search (SEARCH) [minister.search]`, async () => {
    await request().get('/minister/search?text=Name&limit=4&logs=a,d,t')
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
  test(`Testing ${getCounter()} - Method /minister/search (SEARCH) [minister.search]`, async () => {
    await request().get('/minister/search?text=Name 01')
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
  test(`Testing ${getCounter()} - Method /minister/search (SEARCH) [minister.search]`, async () => {
    await request().get('/minister/search?text=01&logs=c,d,t')
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
