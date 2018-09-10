// Declare dependencies
const { request } = require('./../testing');

// Declare mocks spec
const mocks = require('./parish.mocks');
const { errorResponse } = require('./../../utils/errors');

// Setting counter
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

// Run testing
describe('Testing Endpoint /parish', async () => {
  /*  Testing method Create
   *  URI: /parish
   *  Method: POST
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /parish (POST) [parish.create]`, async () => {
      counter += 1;
      await request().post('/parish').send(row)
        .then((response) => {
          if (response.statusCode === 201) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.authorities).toBeDefined();
            expect(response.body.authorities.deacon).toBeDefined();
            expect(response.body.authorities.deacon.length).toEqual(2);
            expect(response.body.authorities.parson).toBeDefined();
            expect(response.body.authorities.parson.length).toEqual(2);
            expect(response.body.authorities.secretary).toBeDefined();
            expect(response.body.authorities.secretary.length).toEqual(2);
            expect(response.body.code).toEqual(row.code);
            expect(response.body.contact).toBeDefined();
            expect(response.body.contact.email).toBeDefined();
            expect(response.body.contact.email.length).toEqual(2);
            expect(response.body.contact.phone).toBeDefined();
            expect(response.body.contact.phone.length).toEqual(2);
            expect(response.body.created).toEqual(row.created);
            expect(response.body.district).toBeDefined();
            expect(response.body.district.archdiocese_code).toEqual(row.district.archdiocese_code);
            expect(response.body.district.decanato_code).toEqual(row.district.decanato_code);
            expect(response.body.district.diocese_code).toEqual(row.district.diocese_code);
            expect(response.body.district.vicarage_code).toEqual(row.district.vicarage_code);
            expect(response.body.geolocation).toBeDefined();
            expect(response.body.geolocation.address).toBeDefined();
            expect(response.body.geolocation.address.code_postal).toEqual(row.geolocation.address.code_postal);
            expect(response.body.geolocation.address.coordinates).toBeDefined();
            expect(response.body.geolocation.address.coordinates.latitude).toEqual(row.geolocation.address.coordinates.latitude);
            expect(response.body.geolocation.address.coordinates.longitude).toEqual(row.geolocation.address.coordinates.longitude);
            expect(response.body.geolocation.address.number).toEqual(row.geolocation.address.number);
            expect(response.body.geolocation.address.street).toEqual(row.geolocation.address.street);
            expect(response.body.geolocation.city_code).toEqual(row.geolocation.city_code);
            expect(response.body.geolocation.country_code).toEqual(row.geolocation.country_code);
            expect(response.body.geolocation.neighborhood_code).toEqual(row.geolocation.neighborhood_code);
            expect(response.body.geolocation.state_code).toEqual(row.geolocation.state_code);
            expect(response.body.image).toEqual(row.image);
            expect(response.body.logs).toBeDefined();
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.name).toEqual(row.name);
            expect(response.body.schedule).toBeDefined();
            expect(response.body.schedule.attention).toBeDefined();
            expect(response.body.schedule.attention.friday).toBeDefined();
            expect(response.body.schedule.attention.friday.finish).toEqual(row.schedule.attention.friday.finish);
            expect(response.body.schedule.attention.friday.start).toEqual(row.schedule.attention.friday.start);
            expect(response.body.schedule.attention.monday).toBeDefined();
            expect(response.body.schedule.attention.monday.finish).toEqual(row.schedule.attention.monday.finish);
            expect(response.body.schedule.attention.monday.start).toEqual(row.schedule.attention.monday.start);
            expect(response.body.schedule.attention.saturday).toBeDefined();
            expect(response.body.schedule.attention.saturday.finish).toEqual(row.schedule.attention.saturday.finish);
            expect(response.body.schedule.attention.saturday.start).toEqual(row.schedule.attention.saturday.start);
            expect(response.body.schedule.attention.sunday).toBeDefined();
            expect(response.body.schedule.attention.sunday.finish).toEqual(row.schedule.attention.sunday.finish);
            expect(response.body.schedule.attention.sunday.start).toEqual(row.schedule.attention.sunday.start);
            expect(response.body.schedule.attention.thursday).toBeDefined();
            expect(response.body.schedule.attention.thursday.finish).toEqual(row.schedule.attention.thursday.finish);
            expect(response.body.schedule.attention.thursday.start).toEqual(row.schedule.attention.thursday.start);
            expect(response.body.schedule.attention.tuesday).toBeDefined();
            expect(response.body.schedule.attention.tuesday.finish).toEqual(row.schedule.attention.tuesday.finish);
            expect(response.body.schedule.attention.tuesday.start).toEqual(row.schedule.attention.tuesday.start);
            expect(response.body.schedule.attention.wednesday).toBeDefined();
            expect(response.body.schedule.attention.wednesday.finish).toEqual(row.schedule.attention.wednesday.finish);
            expect(response.body.schedule.attention.wednesday.start).toEqual(row.schedule.attention.wednesday.start);
            expect(response.body.schedule.eucharist).toBeDefined();
            expect(response.body.schedule.eucharist.length).toEqual(2);
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
   *  URI: /parish/:id
   *  Method: VIEW
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /parish/:id (GET) [parish.view]`, async () => {
      await request().get(`/parish/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.authorities).toBeDefined();
            expect(response.body.authorities.deacon).toBeDefined();
            expect(response.body.authorities.deacon.length).toEqual(2);
            expect(response.body.authorities.parson).toBeDefined();
            expect(response.body.authorities.parson.length).toEqual(2);
            expect(response.body.authorities.secretary).toBeDefined();
            expect(response.body.authorities.secretary.length).toEqual(2);
            expect(response.body.code).toEqual(row.code);
            expect(response.body.contact).toBeDefined();
            expect(response.body.contact.email).toBeDefined();
            expect(response.body.contact.email.length).toEqual(2);
            expect(response.body.contact.phone).toBeDefined();
            expect(response.body.contact.phone.length).toEqual(2);
            expect(response.body.created).toEqual(row.created);
            expect(response.body.district).toBeDefined();
            expect(response.body.district.archdiocese_code).toEqual(row.district.archdiocese_code);
            expect(response.body.district.decanato_code).toEqual(row.district.decanato_code);
            expect(response.body.district.diocese_code).toEqual(row.district.diocese_code);
            expect(response.body.district.vicarage_code).toEqual(row.district.vicarage_code);
            expect(response.body.geolocation).toBeDefined();
            expect(response.body.geolocation.address).toBeDefined();
            expect(response.body.geolocation.address.code_postal).toEqual(row.geolocation.address.code_postal);
            expect(response.body.geolocation.address.coordinates).toBeDefined();
            expect(response.body.geolocation.address.coordinates.latitude).toEqual(row.geolocation.address.coordinates.latitude);
            expect(response.body.geolocation.address.coordinates.longitude).toEqual(row.geolocation.address.coordinates.longitude);
            expect(response.body.geolocation.address.number).toEqual(row.geolocation.address.number);
            expect(response.body.geolocation.address.street).toEqual(row.geolocation.address.street);
            expect(response.body.geolocation.city_code).toEqual(row.geolocation.city_code);
            expect(response.body.geolocation.country_code).toEqual(row.geolocation.country_code);
            expect(response.body.geolocation.neighborhood_code).toEqual(row.geolocation.neighborhood_code);
            expect(response.body.geolocation.state_code).toEqual(row.geolocation.state_code);
            expect(response.body.image).toEqual(row.image);
            expect(response.body.logs).toBeDefined();
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.name).toEqual(row.name);
            expect(response.body.schedule).toBeDefined();
            expect(response.body.schedule.attention).toBeDefined();
            expect(response.body.schedule.attention.friday).toBeDefined();
            expect(response.body.schedule.attention.friday.finish).toEqual(row.schedule.attention.friday.finish);
            expect(response.body.schedule.attention.friday.start).toEqual(row.schedule.attention.friday.start);
            expect(response.body.schedule.attention.monday).toBeDefined();
            expect(response.body.schedule.attention.monday.finish).toEqual(row.schedule.attention.monday.finish);
            expect(response.body.schedule.attention.monday.start).toEqual(row.schedule.attention.monday.start);
            expect(response.body.schedule.attention.saturday).toBeDefined();
            expect(response.body.schedule.attention.saturday.finish).toEqual(row.schedule.attention.saturday.finish);
            expect(response.body.schedule.attention.saturday.start).toEqual(row.schedule.attention.saturday.start);
            expect(response.body.schedule.attention.sunday).toBeDefined();
            expect(response.body.schedule.attention.sunday.finish).toEqual(row.schedule.attention.sunday.finish);
            expect(response.body.schedule.attention.sunday.start).toEqual(row.schedule.attention.sunday.start);
            expect(response.body.schedule.attention.thursday).toBeDefined();
            expect(response.body.schedule.attention.thursday.finish).toEqual(row.schedule.attention.thursday.finish);
            expect(response.body.schedule.attention.thursday.start).toEqual(row.schedule.attention.thursday.start);
            expect(response.body.schedule.attention.tuesday).toBeDefined();
            expect(response.body.schedule.attention.tuesday.finish).toEqual(row.schedule.attention.tuesday.finish);
            expect(response.body.schedule.attention.tuesday.start).toEqual(row.schedule.attention.tuesday.start);
            expect(response.body.schedule.attention.wednesday).toBeDefined();
            expect(response.body.schedule.attention.wednesday.finish).toEqual(row.schedule.attention.wednesday.finish);
            expect(response.body.schedule.attention.wednesday.start).toEqual(row.schedule.attention.wednesday.start);
            expect(response.body.schedule.eucharist).toBeDefined();
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
   *  URI: /parish/:id
   *  Method: PUT
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /parish/:id (PUT) [parish.update]`, async () => {
      const data = row;
      data.name += ' - Update';
      await request().put(`/parish/${row._id}`).send(data)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.authorities).toBeDefined();
            expect(response.body.authorities.deacon).toBeDefined();
            expect(response.body.authorities.deacon.length).toEqual(2);
            expect(response.body.authorities.parson).toBeDefined();
            expect(response.body.authorities.parson.length).toEqual(2);
            expect(response.body.authorities.secretary).toBeDefined();
            expect(response.body.authorities.secretary.length).toEqual(2);
            expect(response.body.code).toEqual(row.code);
            expect(response.body.contact).toBeDefined();
            expect(response.body.contact.email).toBeDefined();
            expect(response.body.contact.email.length).toEqual(2);
            expect(response.body.contact.phone).toBeDefined();
            expect(response.body.contact.phone.length).toEqual(2);
            expect(response.body.created).toEqual(row.created);
            expect(response.body.district).toBeDefined();
            expect(response.body.district.archdiocese_code).toEqual(row.district.archdiocese_code);
            expect(response.body.district.decanato_code).toEqual(row.district.decanato_code);
            expect(response.body.district.diocese_code).toEqual(row.district.diocese_code);
            expect(response.body.district.vicarage_code).toEqual(row.district.vicarage_code);
            expect(response.body.geolocation).toBeDefined();
            expect(response.body.geolocation.address).toBeDefined();
            expect(response.body.geolocation.address.code_postal).toEqual(row.geolocation.address.code_postal);
            expect(response.body.geolocation.address.coordinates).toBeDefined();
            expect(response.body.geolocation.address.coordinates.latitude).toEqual(row.geolocation.address.coordinates.latitude);
            expect(response.body.geolocation.address.coordinates.longitude).toEqual(row.geolocation.address.coordinates.longitude);
            expect(response.body.geolocation.address.number).toEqual(row.geolocation.address.number);
            expect(response.body.geolocation.address.street).toEqual(row.geolocation.address.street);
            expect(response.body.geolocation.city_code).toEqual(row.geolocation.city_code);
            expect(response.body.geolocation.country_code).toEqual(row.geolocation.country_code);
            expect(response.body.geolocation.neighborhood_code).toEqual(row.geolocation.neighborhood_code);
            expect(response.body.geolocation.state_code).toEqual(row.geolocation.state_code);
            expect(response.body.image).toEqual(row.image);
            expect(response.body.logs).toBeDefined();
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.logs.updatedAt).toBeDefined();
            expect(response.body.name).toEqual(row.name);
            expect(response.body.schedule).toBeDefined();
            expect(response.body.schedule.attention).toBeDefined();
            expect(response.body.schedule.attention.friday).toBeDefined();
            expect(response.body.schedule.attention.friday.finish).toEqual(row.schedule.attention.friday.finish);
            expect(response.body.schedule.attention.friday.start).toEqual(row.schedule.attention.friday.start);
            expect(response.body.schedule.attention.monday).toBeDefined();
            expect(response.body.schedule.attention.monday.finish).toEqual(row.schedule.attention.monday.finish);
            expect(response.body.schedule.attention.monday.start).toEqual(row.schedule.attention.monday.start);
            expect(response.body.schedule.attention.saturday).toBeDefined();
            expect(response.body.schedule.attention.saturday.finish).toEqual(row.schedule.attention.saturday.finish);
            expect(response.body.schedule.attention.saturday.start).toEqual(row.schedule.attention.saturday.start);
            expect(response.body.schedule.attention.sunday).toBeDefined();
            expect(response.body.schedule.attention.sunday.finish).toEqual(row.schedule.attention.sunday.finish);
            expect(response.body.schedule.attention.sunday.start).toEqual(row.schedule.attention.sunday.start);
            expect(response.body.schedule.attention.thursday).toBeDefined();
            expect(response.body.schedule.attention.thursday.finish).toEqual(row.schedule.attention.thursday.finish);
            expect(response.body.schedule.attention.thursday.start).toEqual(row.schedule.attention.thursday.start);
            expect(response.body.schedule.attention.tuesday).toBeDefined();
            expect(response.body.schedule.attention.tuesday.finish).toEqual(row.schedule.attention.tuesday.finish);
            expect(response.body.schedule.attention.tuesday.start).toEqual(row.schedule.attention.tuesday.start);
            expect(response.body.schedule.attention.wednesday).toBeDefined();
            expect(response.body.schedule.attention.wednesday.finish).toEqual(row.schedule.attention.wednesday.finish);
            expect(response.body.schedule.attention.wednesday.start).toEqual(row.schedule.attention.wednesday.start);
            expect(response.body.schedule.eucharist).toBeDefined();
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
   *  URI: /parish/:id
   *  Method: DELETE
   */
  mocks.forEach(async (row) => {
    await test(`Testing ${getCounter()} - Method /parish/:id (DELETE) [parish.remove]`, async () => {
      await request().delete(`/parish/${row._id}`)
        .then((response) => {
          if (response.statusCode === 200) {
            expect(response.body).toBeDefined();
            expect(response.body.active).toEqual(row.active);
            expect(response.body.authorities).toBeDefined();
            expect(response.body.authorities.deacon).toBeDefined();
            expect(response.body.authorities.deacon.length).toEqual(2);
            expect(response.body.authorities.parson).toBeDefined();
            expect(response.body.authorities.parson.length).toEqual(2);
            expect(response.body.authorities.secretary).toBeDefined();
            expect(response.body.authorities.secretary.length).toEqual(2);
            expect(response.body.code).toEqual(row.code);
            expect(response.body.contact).toBeDefined();
            expect(response.body.contact.email).toBeDefined();
            expect(response.body.contact.email.length).toEqual(2);
            expect(response.body.contact.phone).toBeDefined();
            expect(response.body.contact.phone.length).toEqual(2);
            expect(response.body.created).toEqual(row.created);
            expect(response.body.district).toBeDefined();
            expect(response.body.district.archdiocese_code).toEqual(row.district.archdiocese_code);
            expect(response.body.district.decanato_code).toEqual(row.district.decanato_code);
            expect(response.body.district.diocese_code).toEqual(row.district.diocese_code);
            expect(response.body.district.vicarage_code).toEqual(row.district.vicarage_code);
            expect(response.body.geolocation).toBeDefined();
            expect(response.body.geolocation.address).toBeDefined();
            expect(response.body.geolocation.address.code_postal).toEqual(row.geolocation.address.code_postal);
            expect(response.body.geolocation.address.coordinates).toBeDefined();
            expect(response.body.geolocation.address.coordinates.latitude).toEqual(row.geolocation.address.coordinates.latitude);
            expect(response.body.geolocation.address.coordinates.longitude).toEqual(row.geolocation.address.coordinates.longitude);
            expect(response.body.geolocation.address.number).toEqual(row.geolocation.address.number);
            expect(response.body.geolocation.address.street).toEqual(row.geolocation.address.street);
            expect(response.body.geolocation.city_code).toEqual(row.geolocation.city_code);
            expect(response.body.geolocation.country_code).toEqual(row.geolocation.country_code);
            expect(response.body.geolocation.neighborhood_code).toEqual(row.geolocation.neighborhood_code);
            expect(response.body.geolocation.state_code).toEqual(row.geolocation.state_code);
            expect(response.body.image).toEqual(row.image);
            expect(response.body.logs).toBeDefined();
            expect(response.body.logs.createdAt).toBeDefined();
            expect(response.body.logs.isDeleted).toEqual(true);
            expect(response.body.logs.test).toEqual(row.logs.test);
            expect(response.body.logs.updatedAt).toBeDefined();
            expect(response.body.name).toEqual(row.name);
            expect(response.body.schedule).toBeDefined();
            expect(response.body.schedule.attention).toBeDefined();
            expect(response.body.schedule.attention.friday).toBeDefined();
            expect(response.body.schedule.attention.friday.finish).toEqual(row.schedule.attention.friday.finish);
            expect(response.body.schedule.attention.friday.start).toEqual(row.schedule.attention.friday.start);
            expect(response.body.schedule.attention.monday).toBeDefined();
            expect(response.body.schedule.attention.monday.finish).toEqual(row.schedule.attention.monday.finish);
            expect(response.body.schedule.attention.monday.start).toEqual(row.schedule.attention.monday.start);
            expect(response.body.schedule.attention.saturday).toBeDefined();
            expect(response.body.schedule.attention.saturday.finish).toEqual(row.schedule.attention.saturday.finish);
            expect(response.body.schedule.attention.saturday.start).toEqual(row.schedule.attention.saturday.start);
            expect(response.body.schedule.attention.sunday).toBeDefined();
            expect(response.body.schedule.attention.sunday.finish).toEqual(row.schedule.attention.sunday.finish);
            expect(response.body.schedule.attention.sunday.start).toEqual(row.schedule.attention.sunday.start);
            expect(response.body.schedule.attention.thursday).toBeDefined();
            expect(response.body.schedule.attention.thursday.finish).toEqual(row.schedule.attention.thursday.finish);
            expect(response.body.schedule.attention.thursday.start).toEqual(row.schedule.attention.thursday.start);
            expect(response.body.schedule.attention.tuesday).toBeDefined();
            expect(response.body.schedule.attention.tuesday.finish).toEqual(row.schedule.attention.tuesday.finish);
            expect(response.body.schedule.attention.tuesday.start).toEqual(row.schedule.attention.tuesday.start);
            expect(response.body.schedule.attention.wednesday).toBeDefined();
            expect(response.body.schedule.attention.wednesday.finish).toEqual(row.schedule.attention.wednesday.finish);
            expect(response.body.schedule.attention.wednesday.start).toEqual(row.schedule.attention.wednesday.start);
            expect(response.body.schedule.eucharist).toBeDefined();
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
   *  URI: /parish
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /parish (LIST) [parish.list]`, async () => {
    await request().get('/parish?limit=3&page=1&order=desc&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /parish (LIST) [parish.list]`, async () => {
    await request().get('/parish?limit=5&page=2&order=asc&logs=c,d,t')
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
  test(`Testing ${getCounter()} - Method /parish (LIST) [parish.list]`, async () => {
    await request().get('/parish?short&limit=5&order=asc&logs=a,d,t')
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
  test(`Testing ${getCounter()} - Method /parish (LIST) [parish.list]`, async () => {
    await request().get('/parish?short&order=asc')
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
  test(`Testing ${getCounter()} - Method /parish (LIST) [parish.list]`, async () => {
    await request().get('/parish?limit=-1&page=-1&order=asc')
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
   *  URI: /parish/search
   *  Method: GET
   */
  test(`Testing ${getCounter()} - Method /parish/search (SEARCH) [parish.search]`, async () => {
    await request().get('/parish/search?text=Name&limit=3&page=1&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /parish/search (SEARCH) [parish.search]`, async () => {
    await request().get('/parish/search?limit=-1&page=-1&logs=d,t')
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
  test(`Testing ${getCounter()} - Method /parish/search (SEARCH) [parish.search]`, async () => {
    await request().get('/parish/search?text=Name&limit=4&logs=a,d,t')
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
  test(`Testing ${getCounter()} - Method /parish/search (SEARCH) [parish.search]`, async () => {
    await request().get('/parish/search?text=Name 01')
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
  test(`Testing ${getCounter()} - Method /parish/search (SEARCH) [parish.search]`, async () => {
    await request().get('/parish/search?text=01&logs=c,d,t')
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
