const request = require('supertest');
const app = require('../index');

describe('GET /api/handwriting', function() {
  it('respond with code 200 & json', function(done) {
    //navigate to root and check the response is code 200 & json

    request(app)
      .get('/api/handwriting')
      .field('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('respond with code 200 & image/png', function(done) {
    //navigate to root and check the response is code 200 & image/png

    request(app)
      .get('/api/handwriting')
      .field('Content-Type', 'image/png')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
