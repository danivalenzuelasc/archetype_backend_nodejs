// Declare dependencies
const { request } = require('./../testing');

// Declare mocks spec
const mocks = require('./user.mocks');
const { errorResponse } = require('./../../utils/errors');

// Setting counter
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

// Run testing
describe('Testing Endpoint /user', async () => {
  /*  Testing method Create
   *  URI: /user
   *  Method: POST
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /user (POST) [user.create]`, async () => {
      counter += 1;
      await request().post('/user').send(row)
        .then((response) => {
          if (response.statusCode === 201) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.authenticate).toBeDefined();
            expect(response.body.authenticate.password).toEqual(row.authenticate.password);
            expect(response.body.authenticate.token).toEqual(row.authenticate.token);
            expect(response.body.authenticate.user).toEqual(row.authenticate.user);
            expect(response.body.basic).toBeDefined();
            expect(response.body.basic.avatar).toEqual(row.basic.avatar);
            expect(response.body.basic.birthday).toEqual(row.basic.birthday);
            expect(response.body.basic.firstName).toEqual(row.basic.firstName);
            expect(response.body.basic.gender).toEqual(row.basic.gender);
            expect(response.body.basic.lastName).toEqual(row.basic.lastName);
            expect(response.body.basic.nationality).toEqual(row.basic.nationality);
            expect(response.body.contact).toBeDefined();
            expect(response.body.contact.address).toBeDefined();
            expect(response.body.contact.address.length).toEqual(row.contact.address.length);
            expect(response.body.contact.email).toBeDefined();
            expect(response.body.contact.email.length).toEqual(row.contact.email.length);
            expect(response.body.contact.phone).toBeDefined();
            expect(response.body.contact.phone.length).toEqual(row.contact.phone.length);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.setting).toBeDefined();
            expect(response.body.setting.language).toEqual(row.setting.language);
            expect(response.body.setting.notifications).toEqual(row.setting.notifications);
            expect(response.body.setting.privacy).toEqual(row.setting.privacy);
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
   *  URI: /user/:id
   *  Method: VIEW
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /user/:id (GET) [user.view]`, async () => {
      await request().get(`/user/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.authenticate).toBeDefined();
            expect(response.body.authenticate.password).toEqual(row.authenticate.password);
            expect(response.body.authenticate.token).toEqual(row.authenticate.token);
            expect(response.body.authenticate.user).toEqual(row.authenticate.user);
            expect(response.body.basic).toBeDefined();
            expect(response.body.basic.avatar).toEqual(row.basic.avatar);
            expect(response.body.basic.birthday).toEqual(row.basic.birthday);
            expect(response.body.basic.firstName).toEqual(row.basic.firstName);
            expect(response.body.basic.gender).toEqual(row.basic.gender);
            expect(response.body.basic.lastName).toEqual(row.basic.lastName);
            expect(response.body.basic.nationality).toEqual(row.basic.nationality);
            expect(response.body.contact).toBeDefined();
            expect(response.body.contact.address).toBeDefined();
            expect(response.body.contact.address.length).toEqual(row.contact.address.length);
            expect(response.body.contact.email).toBeDefined();
            expect(response.body.contact.email.length).toEqual(row.contact.email.length);
            expect(response.body.contact.phone).toBeDefined();
            expect(response.body.contact.phone.length).toEqual(row.contact.phone.length);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.setting).toBeDefined();
            expect(response.body.setting.language).toEqual(row.setting.language);
            expect(response.body.setting.notifications).toEqual(row.setting.notifications);
            expect(response.body.setting.privacy).toEqual(row.setting.privacy);
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
   *  URI: /user/:id
   *  Method: PUT
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /user/:id (PUT) [user.update]`, async () => {
      const data = row;
      data.name += ' - Update';
      await request().put(`/user/${row._id}`).send(data)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.authenticate).toBeDefined();
            expect(response.body.authenticate.password).toEqual(row.authenticate.password);
            expect(response.body.authenticate.token).toEqual(row.authenticate.token);
            expect(response.body.authenticate.user).toEqual(row.authenticate.user);
            expect(response.body.basic).toBeDefined();
            expect(response.body.basic.avatar).toEqual(row.basic.avatar);
            expect(response.body.basic.birthday).toEqual(row.basic.birthday);
            expect(response.body.basic.firstName).toEqual(row.basic.firstName);
            expect(response.body.basic.gender).toEqual(row.basic.gender);
            expect(response.body.basic.lastName).toEqual(row.basic.lastName);
            expect(response.body.basic.nationality).toEqual(row.basic.nationality);
            expect(response.body.contact).toBeDefined();
            expect(response.body.contact.address).toBeDefined();
            expect(response.body.contact.address.length).toEqual(row.contact.address.length);
            expect(response.body.contact.email).toBeDefined();
            expect(response.body.contact.email.length).toEqual(row.contact.email.length);
            expect(response.body.contact.phone).toBeDefined();
            expect(response.body.contact.phone.length).toEqual(row.contact.phone.length);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.logs.updatedAt).toBeDefined();
            expect(response.body.setting).toBeDefined();
            expect(response.body.setting.language).toEqual(row.setting.language);
            expect(response.body.setting.notifications).toEqual(row.setting.notifications);
            expect(response.body.setting.privacy).toEqual(row.setting.privacy);
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
   *  URI: /user/:id
   *  Method: DELETE
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /user/:id (DELETE) [user.remove]`, async () => {
      await request().delete(`/user/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.authenticate).toBeDefined();
            expect(response.body.authenticate.password).toEqual(row.authenticate.password);
            expect(response.body.authenticate.token).toEqual(row.authenticate.token);
            expect(response.body.authenticate.user).toEqual(row.authenticate.user);
            expect(response.body.basic).toBeDefined();
            expect(response.body.basic.avatar).toEqual(row.basic.avatar);
            expect(response.body.basic.birthday).toEqual(row.basic.birthday);
            expect(response.body.basic.firstName).toEqual(row.basic.firstName);
            expect(response.body.basic.gender).toEqual(row.basic.gender);
            expect(response.body.basic.lastName).toEqual(row.basic.lastName);
            expect(response.body.basic.nationality).toEqual(row.basic.nationality);
            expect(response.body.contact).toBeDefined();
            expect(response.body.contact.address).toBeDefined();
            expect(response.body.contact.address.length).toEqual(row.contact.address.length);
            expect(response.body.contact.email).toBeDefined();
            expect(response.body.contact.email.length).toEqual(row.contact.email.length);
            expect(response.body.contact.phone).toBeDefined();
            expect(response.body.contact.phone.length).toEqual(row.contact.phone.length);
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(true);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.logs.updatedAt).toBeDefined();
            expect(response.body.setting).toBeDefined();
            expect(response.body.setting.language).toEqual(row.setting.language);
            expect(response.body.setting.notifications).toEqual(row.setting.notifications);
            expect(response.body.setting.privacy).toEqual(row.setting.privacy);
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
   *  URI: /user
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /user (LIST) [user.list]`, async () => {
    await request().get('/user?limit=3&page=1&order=desc&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /user (LIST) [user.list]`, async () => {
    await request().get('/user?limit=5&page=2&order=asc&logs=c,d,t')
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
  test(`Testing ${getCounter()} - Method /user (LIST) [user.list]`, async () => {
    await request().get('/user?short&limit=5&order=asc&logs=a,d,t')
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
  test(`Testing ${getCounter()} - Method /user (LIST) [user.list]`, async () => {
    await request().get('/user?short&order=asc')
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
  test(`Testing ${getCounter()} - Method /user (LIST) [user.list]`, async () => {
    await request().get('/user?limit=-1&page=-1&order=asc')
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
   *  URI: /user/search
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /user/search (SEARCH) [user.search]`, async () => {
    await request().get('/user/search?text=User&limit=3&page=1&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /user/search (SEARCH) [user.search]`, async () => {
    await request().get('/user/search?limit=-1&page=-1&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /user/search (SEARCH) [user.search]`, async () => {
    await request().get('/user/search?text=User&limit=4&logs=a,d,t')
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
  test(`Testing ${getCounter()} - Method /user/search (SEARCH) [user.search]`, async () => {
    await request().get('/user/search?text=User 01')
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
  test(`Testing ${getCounter()} - Method /user/search (SEARCH) [user.search]`, async () => {
    await request().get('/user/search?text=01&logs=c,d,t')
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
