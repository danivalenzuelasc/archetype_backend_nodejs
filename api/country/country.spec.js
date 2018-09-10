// Declare dependencies
const { request } = require('./../testing');

// Declare mocks spec
const mocks = require('./country.mocks');
const { errorResponse } = require('./../../utils/errors');

// Setting counter
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

// Run testing
describe('Testing Endpoint /country', async () => {
  /*  Testing method Create
   *  URI: /country
   *  Method: POST
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /country (POST) [country.create]`, async () => {
      counter += 1;
      await request().post('/country').send(row)
        .then((response) => {
          if (response.statusCode === 201) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.currency).toBeDefined();
            expect(response.body.currency.length).toEqual(2);
            expect(response.body.geometry).toBeDefined();
            expect(response.body.geometry.coordinates).toBeDefined();
            expect(response.body.geometry.coordinates.latitude).toEqual(row.geometry.coordinates.latitude);
            expect(response.body.geometry.coordinates.longitude).toEqual(row.geometry.coordinates.longitude);
            expect(response.body.geometry.location).toEqual(row.geometry.location);
            expect(response.body.geometry.viewport).toBeDefined();
            expect(response.body.geometry.viewport.northeast).toBeDefined();
            expect(response.body.geometry.viewport.northeast.latitude).toEqual(row.geometry.viewport.northeast.latitude);
            expect(response.body.geometry.viewport.northeast.longitude).toEqual(row.geometry.viewport.northeast.longitude);
            expect(response.body.geometry.viewport.southwest).toBeDefined();
            expect(response.body.geometry.viewport.southwest.latitude).toEqual(row.geometry.viewport.southwest.latitude);
            expect(response.body.geometry.viewport.southwest.longitude).toEqual(row.geometry.viewport.southwest.longitude);
            expect(response.body.image).toEqual(row.image);
            expect(response.body.iso).toBeDefined();
            expect(response.body.iso.code).toEqual(row.iso.code);
            expect(response.body.iso.domain).toEqual(row.iso.domain);
            expect(response.body.iso.number).toEqual(row.iso.number);
            expect(response.body.iso.phone).toEqual(row.iso.phone);
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
   *  URI: /country/:id
   *  Method: VIEW
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /country/:id (GET) [country.view]`, async () => {
      await request().get(`/country/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.currency).toBeDefined();
            expect(response.body.currency.length).toEqual(2);
            expect(response.body.geometry).toBeDefined();
            expect(response.body.geometry.coordinates).toBeDefined();
            expect(response.body.geometry.coordinates.latitude).toEqual(row.geometry.coordinates.latitude);
            expect(response.body.geometry.coordinates.longitude).toEqual(row.geometry.coordinates.longitude);
            expect(response.body.geometry.location).toEqual(row.geometry.location);
            expect(response.body.geometry.viewport).toBeDefined();
            expect(response.body.geometry.viewport.northeast).toBeDefined();
            expect(response.body.geometry.viewport.northeast.latitude).toEqual(row.geometry.viewport.northeast.latitude);
            expect(response.body.geometry.viewport.northeast.longitude).toEqual(row.geometry.viewport.northeast.longitude);
            expect(response.body.geometry.viewport.southwest).toBeDefined();
            expect(response.body.geometry.viewport.southwest.latitude).toEqual(row.geometry.viewport.southwest.latitude);
            expect(response.body.geometry.viewport.southwest.longitude).toEqual(row.geometry.viewport.southwest.longitude);
            expect(response.body.image).toEqual(row.image);
            expect(response.body.iso).toBeDefined();
            expect(response.body.iso.code).toEqual(row.iso.code);
            expect(response.body.iso.domain).toEqual(row.iso.domain);
            expect(response.body.iso.number).toEqual(row.iso.number);
            expect(response.body.iso.phone).toEqual(row.iso.phone);
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
   *  URI: /country/:id
   *  Method: PUT
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /country/:id (PUT) [country.update]`, async () => {
      const data = row;
      data.name += ' - Update';
      await request().put(`/country/${row._id}`).send(data)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.currency).toBeDefined();
            expect(response.body.currency.length).toEqual(2);
            expect(response.body.geometry).toBeDefined();
            expect(response.body.geometry.coordinates).toBeDefined();
            expect(response.body.geometry.coordinates.latitude).toEqual(row.geometry.coordinates.latitude);
            expect(response.body.geometry.coordinates.longitude).toEqual(row.geometry.coordinates.longitude);
            expect(response.body.geometry.location).toEqual(row.geometry.location);
            expect(response.body.geometry.viewport).toBeDefined();
            expect(response.body.geometry.viewport.northeast).toBeDefined();
            expect(response.body.geometry.viewport.northeast.latitude).toEqual(row.geometry.viewport.northeast.latitude);
            expect(response.body.geometry.viewport.northeast.longitude).toEqual(row.geometry.viewport.northeast.longitude);
            expect(response.body.geometry.viewport.southwest).toBeDefined();
            expect(response.body.geometry.viewport.southwest.latitude).toEqual(row.geometry.viewport.southwest.latitude);
            expect(response.body.geometry.viewport.southwest.longitude).toEqual(row.geometry.viewport.southwest.longitude);
            expect(response.body.image).toEqual(row.image);
            expect(response.body.iso).toBeDefined();
            expect(response.body.iso.code).toEqual(row.iso.code);
            expect(response.body.iso.domain).toEqual(row.iso.domain);
            expect(response.body.iso.number).toEqual(row.iso.number);
            expect(response.body.iso.phone).toEqual(row.iso.phone);
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
   *  URI: /country/:id
   *  Method: DELETE
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /country/:id (DELETE) [country.remove]`, async () => {
      await request().delete(`/country/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.currency).toBeDefined();
            expect(response.body.currency.length).toEqual(2);
            expect(response.body.geometry).toBeDefined();
            expect(response.body.geometry.coordinates).toBeDefined();
            expect(response.body.geometry.coordinates.latitude).toEqual(row.geometry.coordinates.latitude);
            expect(response.body.geometry.coordinates.longitude).toEqual(row.geometry.coordinates.longitude);
            expect(response.body.geometry.location).toEqual(row.geometry.location);
            expect(response.body.geometry.viewport).toBeDefined();
            expect(response.body.geometry.viewport.northeast).toBeDefined();
            expect(response.body.geometry.viewport.northeast.latitude).toEqual(row.geometry.viewport.northeast.latitude);
            expect(response.body.geometry.viewport.northeast.longitude).toEqual(row.geometry.viewport.northeast.longitude);
            expect(response.body.geometry.viewport.southwest).toBeDefined();
            expect(response.body.geometry.viewport.southwest.latitude).toEqual(row.geometry.viewport.southwest.latitude);
            expect(response.body.geometry.viewport.southwest.longitude).toEqual(row.geometry.viewport.southwest.longitude);
            expect(response.body.image).toEqual(row.image);
            expect(response.body.iso).toBeDefined();
            expect(response.body.iso.code).toEqual(row.iso.code);
            expect(response.body.iso.domain).toEqual(row.iso.domain);
            expect(response.body.iso.number).toEqual(row.iso.number);
            expect(response.body.iso.phone).toEqual(row.iso.phone);
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
   *  URI: /country
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /country (LIST) [country.list]`, async () => {
    await request().get('/country?limit=3&page=1&order=desc&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /country (LIST) [country.list]`, async () => {
    await request().get('/country?limit=5&page=2&order=asc&logs=c,d,t')
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
  test(`Testing ${getCounter()} - Method /country (LIST) [country.list]`, async () => {
    await request().get('/country?short&limit=5&order=asc&logs=a,d,t')
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
  test(`Testing ${getCounter()} - Method /country (LIST) [country.list]`, async () => {
    await request().get('/country?short&order=asc')
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
  test(`Testing ${getCounter()} - Method /country (LIST) [country.list]`, async () => {
    await request().get('/country?limit=-1&page=-1&order=asc')
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
   *  URI: /country/search
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /country/search (SEARCH) [country.search]`, async () => {
    await request().get('/country/search?text=Name&limit=3&page=1&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /country/search (SEARCH) [country.search]`, async () => {
    await request().get('/country/search?limit=-1&page=-1&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /country/search (SEARCH) [country.search]`, async () => {
    await request().get('/country/search?text=Name&limit=4&logs=a,d,t')
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
  test(`Testing ${getCounter()} - Method /country/search (SEARCH) [country.search]`, async () => {
    await request().get('/country/search?text=Name 01')
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
  test(`Testing ${getCounter()} - Method /country/search (SEARCH) [country.search]`, async () => {
    await request().get('/country/search?text=01&logs=c,d,t')
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
