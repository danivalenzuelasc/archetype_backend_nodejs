// Declare seeds
const supertest = require('supertest');
const app = require('./../app');

// Export request()
module.exports.request = () => supertest(app);
