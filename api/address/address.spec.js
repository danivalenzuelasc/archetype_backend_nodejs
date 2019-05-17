// Declare dependencies
const { request } = require('./../testing');

// Declare mocks spec
const mocks = require('./address.mocks');
const { errorResponse } = require('./../../utils/errors');

// Setting counter
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

// Run testing
describe('Testing Endpoint /address', async () => {
  /*  Testing method Create
   *  URI: /address
   *  Method: POST
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /address (POST) [address.create]`, async () => {
      counter += 1;
      await request().post('/address').send(row)
        .then((response) => {
          if (response.statusCode === 201) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.description).toEqual(row.description);
            expect(response.body.floor).toEqual(row.floor);
            expect(response.body.geometry).toBeDefined();
            expect(response.body.geometry.city_code).toEqual(row.geometry.city_code);
            expect(response.body.geometry.coordinates).toBeDefined();
            expect(response.body.geometry.coordinates.latitude).toEqual(row.geometry.coordinates.latitude);
            expect(response.body.geometry.coordinates.longitude).toEqual(row.geometry.coordinates.longitude);
            expect(response.body.geometry.country_code).toEqual(row.geometry.country_code);
            expect(response.body.geometry.location).toEqual(row.geometry.location);
            expect(response.body.geometry.neighborhood_code).toEqual(row.geometry.neighborhood_code);
            expect(response.body.geometry.state_code).toEqual(row.geometry.state_code);
            expect(response.body.geometry.viewport).toBeDefined();
            expect(response.body.geometry.viewport.northeast).toBeDefined();
            expect(response.body.geometry.viewport.northeast.latitude).toEqual(row.geometry.viewport.northeast.latitude);
            expect(response.body.geometry.viewport.northeast.longitude).toEqual(row.geometry.viewport.northeast.longitude);
            expect(response.body.geometry.viewport.southwest).toBeDefined();
            expect(response.body.geometry.viewport.southwest.latitude).toEqual(row.geometry.viewport.southwest.latitude);
            expect(response.body.geometry.viewport.southwest.longitude).toEqual(row.geometry.viewport.southwest.longitude);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.number).toEqual(row.number);
            expect(response.body.postal_code).toEqual(row.postal_code);
            expect(response.body.room).toEqual(row.room);
            expect(response.body.street).toEqual(row.street);
            expect(response.body.tax).toBeDefined();
            expect(response.body.tax.role).toEqual(row.tax.role);
            expect(response.body.tax.valuation).toBeDefined();
            expect(response.body.tax.valuation.currency).toEqual(row.tax.valuation.currency);
            expect(response.body.tax.valuation.value).toEqual(row.tax.valuation.value);
            expect(response.body.type).toEqual(row.type);
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
   *  URI: /address/:id
   *  Method: VIEW
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /address/:id (GET) [address.view]`, async () => {
      await request().get(`/address/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.description).toEqual(row.description);
            expect(response.body.floor).toEqual(row.floor);
            expect(response.body.geometry).toBeDefined();
            expect(response.body.geometry.city_code).toEqual(row.geometry.city_code);
            expect(response.body.geometry.coordinates).toBeDefined();
            expect(response.body.geometry.coordinates.latitude).toEqual(row.geometry.coordinates.latitude);
            expect(response.body.geometry.coordinates.longitude).toEqual(row.geometry.coordinates.longitude);
            expect(response.body.geometry.country_code).toEqual(row.geometry.country_code);
            expect(response.body.geometry.location).toEqual(row.geometry.location);
            expect(response.body.geometry.neighborhood_code).toEqual(row.geometry.neighborhood_code);
            expect(response.body.geometry.state_code).toEqual(row.geometry.state_code);
            expect(response.body.geometry.viewport).toBeDefined();
            expect(response.body.geometry.viewport.northeast).toBeDefined();
            expect(response.body.geometry.viewport.northeast.latitude).toEqual(row.geometry.viewport.northeast.latitude);
            expect(response.body.geometry.viewport.northeast.longitude).toEqual(row.geometry.viewport.northeast.longitude);
            expect(response.body.geometry.viewport.southwest).toBeDefined();
            expect(response.body.geometry.viewport.southwest.latitude).toEqual(row.geometry.viewport.southwest.latitude);
            expect(response.body.geometry.viewport.southwest.longitude).toEqual(row.geometry.viewport.southwest.longitude);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.number).toEqual(row.number);
            expect(response.body.postal_code).toEqual(row.postal_code);
            expect(response.body.room).toEqual(row.room);
            expect(response.body.street).toEqual(row.street);
            expect(response.body.tax).toBeDefined();
            expect(response.body.tax.role).toEqual(row.tax.role);
            expect(response.body.tax.valuation).toBeDefined();
            expect(response.body.tax.valuation.currency).toEqual(row.tax.valuation.currency);
            expect(response.body.tax.valuation.value).toEqual(row.tax.valuation.value);
            expect(response.body.type).toEqual(row.type);
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
   *  URI: /address/:id
   *  Method: PUT
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /address/:id (PUT) [address.update]`, async () => {
      const data = row;
      data.name += ' - Update';
      await request().put(`/address/${row._id}`).send(data)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.description).toEqual(row.description);
            expect(response.body.floor).toEqual(row.floor);
            expect(response.body.geometry).toBeDefined();
            expect(response.body.geometry.city_code).toEqual(row.geometry.city_code);
            expect(response.body.geometry.coordinates).toBeDefined();
            expect(response.body.geometry.coordinates.latitude).toEqual(row.geometry.coordinates.latitude);
            expect(response.body.geometry.coordinates.longitude).toEqual(row.geometry.coordinates.longitude);
            expect(response.body.geometry.country_code).toEqual(row.geometry.country_code);
            expect(response.body.geometry.location).toEqual(row.geometry.location);
            expect(response.body.geometry.neighborhood_code).toEqual(row.geometry.neighborhood_code);
            expect(response.body.geometry.state_code).toEqual(row.geometry.state_code);
            expect(response.body.geometry.viewport).toBeDefined();
            expect(response.body.geometry.viewport.northeast).toBeDefined();
            expect(response.body.geometry.viewport.northeast.latitude).toEqual(row.geometry.viewport.northeast.latitude);
            expect(response.body.geometry.viewport.northeast.longitude).toEqual(row.geometry.viewport.northeast.longitude);
            expect(response.body.geometry.viewport.southwest).toBeDefined();
            expect(response.body.geometry.viewport.southwest.latitude).toEqual(row.geometry.viewport.southwest.latitude);
            expect(response.body.geometry.viewport.southwest.longitude).toEqual(row.geometry.viewport.southwest.longitude);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.logs.updatedAt).toBeDefined();
            expect(response.body.number).toEqual(row.number);
            expect(response.body.postal_code).toEqual(row.postal_code);
            expect(response.body.room).toEqual(row.room);
            expect(response.body.street).toEqual(row.street);
            expect(response.body.tax).toBeDefined();
            expect(response.body.tax.role).toEqual(row.tax.role);
            expect(response.body.tax.valuation).toBeDefined();
            expect(response.body.tax.valuation.currency).toEqual(row.tax.valuation.currency);
            expect(response.body.tax.valuation.value).toEqual(row.tax.valuation.value);
            expect(response.body.type).toEqual(row.type);
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
   *  URI: /address/:id
   *  Method: DELETE
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /address/:id (DELETE) [address.remove]`, async () => {
      await request().delete(`/address/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.description).toEqual(row.description);
            expect(response.body.floor).toEqual(row.floor);
            expect(response.body.geometry).toBeDefined();
            expect(response.body.geometry.city_code).toEqual(row.geometry.city_code);
            expect(response.body.geometry.coordinates).toBeDefined();
            expect(response.body.geometry.coordinates.latitude).toEqual(row.geometry.coordinates.latitude);
            expect(response.body.geometry.coordinates.longitude).toEqual(row.geometry.coordinates.longitude);
            expect(response.body.geometry.country_code).toEqual(row.geometry.country_code);
            expect(response.body.geometry.location).toEqual(row.geometry.location);
            expect(response.body.geometry.neighborhood_code).toEqual(row.geometry.neighborhood_code);
            expect(response.body.geometry.state_code).toEqual(row.geometry.state_code);
            expect(response.body.geometry.viewport).toBeDefined();
            expect(response.body.geometry.viewport.northeast).toBeDefined();
            expect(response.body.geometry.viewport.northeast.latitude).toEqual(row.geometry.viewport.northeast.latitude);
            expect(response.body.geometry.viewport.northeast.longitude).toEqual(row.geometry.viewport.northeast.longitude);
            expect(response.body.geometry.viewport.southwest).toBeDefined();
            expect(response.body.geometry.viewport.southwest.latitude).toEqual(row.geometry.viewport.southwest.latitude);
            expect(response.body.geometry.viewport.southwest.longitude).toEqual(row.geometry.viewport.southwest.longitude);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(true);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.logs.updatedAt).toBeDefined();
            expect(response.body.number).toEqual(row.number);
            expect(response.body.postal_code).toEqual(row.postal_code);
            expect(response.body.room).toEqual(row.room);
            expect(response.body.street).toEqual(row.street);
            expect(response.body.tax).toBeDefined();
            expect(response.body.tax.role).toEqual(row.tax.role);
            expect(response.body.tax.valuation).toBeDefined();
            expect(response.body.tax.valuation.currency).toEqual(row.tax.valuation.currency);
            expect(response.body.tax.valuation.value).toEqual(row.tax.valuation.value);
            expect(response.body.type).toEqual(row.type);
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
   *  URI: /address
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /address (LIST) [address.list]`, async () => {
    await request().get('/address?limit=3&page=1&order=desc&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /address (LIST) [address.list]`, async () => {
    await request().get('/address?limit=5&page=2&order=asc&logs=c,d,t')
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
  test(`Testing ${getCounter()} - Method /address (LIST) [address.list]`, async () => {
    await request().get('/address?short&limit=5&order=asc&logs=a,d,t')
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
  test(`Testing ${getCounter()} - Method /address (LIST) [address.list]`, async () => {
    await request().get('/address?short&order=asc')
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
  test(`Testing ${getCounter()} - Method /address (LIST) [address.list]`, async () => {
    await request().get('/address?limit=-1&page=-1&order=asc')
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
   *  URI: /address/search
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /address/search (SEARCH) [address.search]`, async () => {
    await request().get('/address/search?text=Street&limit=3&page=1&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /address/search (SEARCH) [address.search]`, async () => {
    await request().get('/address/search?limit=-1&page=-1&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /address/search (SEARCH) [address.search]`, async () => {
    await request().get('/address/search?text=Street&limit=4&logs=a,d,t')
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
  test(`Testing ${getCounter()} - Method /address/search (SEARCH) [address.search]`, async () => {
    await request().get('/address/search?text=Street 01')
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
  test(`Testing ${getCounter()} - Method /address/search (SEARCH) [address.search]`, async () => {
    await request().get('/address/search?text=01&logs=c,d,t')
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
