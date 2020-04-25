const app = require('../src/app');

describe('App', () => {

  it('GET / responds with 200 and the string Hello', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello')
  });

  // more tests here

});