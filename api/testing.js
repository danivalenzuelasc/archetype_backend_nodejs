// Declaracion de dependencias
const supertest = require('supertest');
const app = require('./../app');

// Se exporta el metodo de pruebas request()
module.exports.request = () => supertest(app);
