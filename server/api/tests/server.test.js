const request = require('supertest');
// const fs = require('fs');
const app = require('../app');
const seedTestingDB = require('../testUtils/testSeed');

let testSoda = { label: 'TestSoda', price: 1.00, quantity: 100 };
describe('Test requests for server', () => {
  beforeAll(async () => {
    await seedTestingDB();
  });

  test('It should respond to GET /api/sodas', (done) => {
    request(app)
      .get('/api/sodas')
      .then((response) => {
        expect(response.body.length).toBe(4);
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test('It should respond to GET /api/sodas', (done) => {
    request(app)
      .get('/api/sodas').then((response) => {
        expect(response.body.length).toBe(4);
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test('It should respond to GET /api/transactions', (done) => {
    request(app)
      .get('/api/transactions')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test('It should respond to POST /api/sodas', (done) => {
    request(app)
      .post('/api/sodas')
      .set('Content-Type', 'application/json')
      .send(testSoda)
      .expect(200)
      .end((err, response) => {
        testSoda = response.body;
        if (err) return err;
        return done();
      });
  });
  test('It should respond to PUT /api/sodas', (done) => {
    request(app)
      .put(`/api/sodas/${testSoda.id}`)
      .set('Content-Type', 'application/json')
      .send({
        id: testSoda.id, label: 'TestSoda', price: 1.50, quantity: 50,
      })
      .expect(200)
      .end((err, response) => {
        console.log(testSoda.id);
        expect(response.body[0]).toBe(1);
        if (err) return err;
        return done();
      });
  });
});
