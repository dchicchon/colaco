const request = require('supertest');
const app = require('../app');

describe('Test GET requests for server', () => {
  test('It should respond to GET /api/sodas', (done) => {
    request(app)
      .get('/api/sodas')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test('It should respond to GET /admin/sodas', (done) => {
    request(app)
      .get('/admin/sodas').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test('It should respond to GET /admin/transactions', (done) => {
    request(app)
      .get('/admin/transactions')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('Test POST requests for server', (done) => {
  request(app)
    .post('/admin/sodas')
    .send({ label: 'TestSoda', price: 1.00, quantity: 100 })
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
});
