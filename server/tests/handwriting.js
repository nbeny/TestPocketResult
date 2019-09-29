const request = require('supertest');
const app = require('../index');

describe('GET /api/handwriting', function() {
  it('respond with code 200 & json array of handwriting', function(done) {
    //navigate to root and check the response is code 200 & json

    const qs = {
      limit: 200,
      offset: 0,
      order_dir: 'asc',
      order_by: 'id'
    };

    request(app)
      .get('/api/handwriting')
      .send(qs)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });

  it('respond with code 400 & json error limit', function(done) {
    //navigate to root and check the response is code 200 & json

    const qs = {
      limit: 100000,
      offset: 0,
      order_dir: 'desc',
      order_by: 'date_created'
    };

    const error = {
      error: 'limit: minimum is 1 , maximum is 1000'
    };

    request(app)
      .get('/api/handwriting')
      .send(qs)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(error, done);
  });

  it('respond with code 200 & json', function(done) {
    //navigate to root and check the response is code 200 & json

    const qs = {
      limit: 100,
      offset: 0,
      order_dir: 'asc',
      order_by: 'date_created'
    };

    request(app)
      .get('/api/handwriting')
      .send(qs)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });
});
