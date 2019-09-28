const request = require('supertest');
const app = require('../index');

describe('GET /', function() {
  it('respond with code 200 & json welcome', function(done) {
    //navigate to root and check the response is code 200 & json welcome

    const response = { msg: 'Welcome to the v1 api.' };

    request(app)
      .get('/')
      .expect(response, done);
  });
});
