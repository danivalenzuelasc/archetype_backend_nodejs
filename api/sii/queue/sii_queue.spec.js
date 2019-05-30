// Declare dependencies
const { request } = require('./../../testing');

// Declare mocks spec
const mocks = require('./sii_queue.mocks');
const { errorResponse } = require('./../../../utils/errors');

// Setting counter
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

/*  Testing method Create
  *  URI: /sii/queue
  *  Method: POST
  */
mocks.forEach(async (row) => {
  await test(`Testing ${getCounter()} - Method /sii/queue (POST) [siiQueue.create]`, async () => {
    counter += 1;
    await request().post('/sii/queue').send(row)
      .then((response) => {
        if (response.statusCode === 201) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toEqual(null);
          expect(response.body.synchronize).toBeDefined();
          expect(response.body.synchronize.period).toEqual(row.synchronize.period);
          expect(response.body.synchronize.type).toEqual(row.synchronize.type);
          expect(response.body.user).toEqual(row.user);
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
  *  URI: /sii/queue/:id
  *  Method: VIEW
  */
mocks.forEach(async (row) => {
  await test(`Testing ${getCounter()} - Method /sii/queue/:id (GET) [siiQueue.view]`, async () => {
    await request().get(`/sii/queue/${row._id}`)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(response.body.synchronize).toBeDefined();
          expect(response.body.synchronize.period).toEqual(row.synchronize.period);
          expect(response.body.synchronize.type).toEqual(row.synchronize.type);
          expect(response.body.user).toEqual(row.user);
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
  *  URI: /sii/queue/:id
  *  Method: PUT
  */
mocks.forEach(async (row) => {
  await test(`Testing ${getCounter()} - Method /sii/queue/:id (PUT) [siiQueue.update]`, async () => {
    const data = row;
    data.name += ' - Update';
    await request().put(`/sii/queue/${row._id}`).send(data)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(response.body.synchronize).toBeDefined();
          expect(response.body.synchronize.period).toEqual(row.synchronize.period);
          expect(response.body.synchronize.type).toEqual(row.synchronize.type);
          expect(response.body.user).toEqual(row.user);
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
  *  URI: /sii/queue/:id
  *  Method: DELETE
  */
mocks.forEach(async (row) => {
  await test(`Testing ${getCounter()} - Method /sii/queue/:id (DELETE) [siiQueue.remove]`, async () => {
    await request().delete(`/sii/queue/${row._id}`)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(!row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(response.body.synchronize).toBeDefined();
          expect(response.body.synchronize.period).toEqual(row.synchronize.period);
          expect(response.body.synchronize.type).toEqual(row.synchronize.type);
          expect(response.body.user).toEqual(row.user);
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
  *  URI: /sii/queue
  *  Method: GET
  */
test(`Testing ${getCounter()} - Method /sii/queue (LIST) [siiQueue.list]`, async () => {
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
        expect(response.body.message).toEqual(error.message);
        expect(response.body.status).toEqual(error.status);
      }
    });
}, 10000);
test(`Testing ${getCounter()} - Method /sii/queue (LIST) [siiQueue.list]`, async () => {
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
        expect(response.body.message).toEqual(error.message);
        expect(response.body.status).toEqual(error.status);
      }
    });
}, 10000);
test(`Testing ${getCounter()} - Method /sii/queue (LIST) [siiQueue.list]`, async () => {
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
        expect(response.body.message).toEqual(error.message);
        expect(response.body.status).toEqual(error.status);
      }
    });
}, 10000);
test(`Testing ${getCounter()} - Method /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?short&order=asc')
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
test(`Testing ${getCounter()} - Method /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=-1&page=-1&order=asc')
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
test(`Testing ${getCounter()} - Method /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=5&page=-1&order=asc&logs=d,t&type=a')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toBeDefined();
        expect(response.body.paging.limit).toEqual(5);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.message).toEqual(error.message);
        expect(response.body.status).toEqual(error.status);
      }
    });
}, 10000);
test(`Testing ${getCounter()} - Method /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=-1&page=-1&order=asc&logs=d,t&type=Automatic')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toBeDefined();
        expect(response.body.paging.limit).toEqual(500);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(4);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.message).toEqual(error.message);
        expect(response.body.status).toEqual(error.status);
      }
    });
}, 10000);
test(`Testing ${getCounter()} - Method /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=3&page=-1&order=asc&logs=d,t&type=Automatic')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toBeDefined();
        expect(response.body.paging.limit).toEqual(3);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(4);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.message).toEqual(error.message);
        expect(response.body.status).toEqual(error.status);
      }
    });
}, 10000);
test(`Testing ${getCounter()} - Method /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=-2&page=-1&order=asc&logs=d,t&type=Priority')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toBeDefined();
        expect(response.body.paging.limit).toEqual(500);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(2);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.message).toEqual(error.message);
        expect(response.body.status).toEqual(error.status);
      }
    });
}, 10000);
test(`Testing ${getCounter()} - Method /sii/queue (LIST) [siiQueue.list]`, async () => {
  await request().get('/sii/queue?limit=1&page=-1&order=asc&logs=d,t&type=Priority')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toBeDefined();
        expect(response.body.paging.limit).toEqual(1);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(2);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.message).toEqual(error.message);
        expect(response.body.status).toEqual(error.status);
      }
    });
}, 10000);