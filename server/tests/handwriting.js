const request = require('supertest');
const app = require('../index');

describe('GET /api/handwriting', function() {
  it('respond with code 200 & json', function(done) {
    //navigate to root and check the response is code 200 & json

    request(app)
      .get('/api/handwriting')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });

  it('respond with code 200 & image/png', function(done) {
    //navigate to root and check the response is code 200 & image/png

    request(app)
      .get('/api/handwriting')
      .expect('Content-Type', 'image/png')
      .expect(200, done);
  });
});
