const request = require('supertest');
const app = require('../app');
const seedTestingDB = require('../testUtils/testSeed');

beforeAll(async () => {
  await seedTestingDB();
});

let testSoda = { label: 'TestSoda', price: 1.00, quantity: 100 };
describe('Test requests for server', () => {
  test('It should respond to GET /api/sodas', (done) => {
    request(app)
      .get('/api/sodas')
      .then((response) => {
        expect(response.body.length).toBe(4);
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test('It should respond to GET /admin/sodas', (done) => {
    request(app)
      .get('/admin/sodas').then((response) => {
        expect(response.body.length).toBe(4);
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
  test('It should respond to POST /admin/sodas', (done) => {
    request(app)
      .post('/admin/sodas')
      .set('Content-Type', 'application/json')
      .send(testSoda)
      .expect(200)
      .end((err, response) => {
        testSoda = response.body;
        if (err) return err;
        return done();
      });
  });
  test('It should respond to PUT /admin/sodas', (done) => {
    request(app)
      .put('/admin/sodas')
      .set('Content-Type', 'application/json')
      .send({
        id: testSoda.id, label: 'TestSoda', price: 1.50, quantity: 50,
      })
      .expect(200)
      .end((err, response) => {
        expect(response.body[0]).toBe(1);
        if (err) return err;
        return done();
      });
  });
});
