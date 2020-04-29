const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers')

const { TEST_DATABASE_URL } = require('../src/config');
const makeTestEmployees = helpers.makeTestEmployees();
const makeTestUsers = helpers.makeTestUsers();



// set up variables used throughout these tests
// const table_name = 'employees';
// const endpoint = '/api/employees';

describe('Employees endpoints', () => {
  let db;



  before('set up db instance', () => {
    db = knex({
      client: 'pg',
      connection: TEST_DATABASE_URL
    });

    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());
  before('cleanup', () => helpers.cleanTables(db));
  afterEach('cleanup', () => helpers.cleanTables(db));


  describe(`GET /api/employees`, () => {
    context(`Given no employees`, () => {
      beforeEach('insert users', () =>
        helpers.seedUsers(db, makeTestUsers)
      )
      it(`responds with 200 and an empty employee Array`, () => {
        return supertest(app)
          .get('/api/employees')
          .set('Authorization', helpers.makeAuthHeader(makeTestUsers[0]))
          // .send(user)
          .expect(200, [])
      })
    })



    context(`Given there are employees in the DB`, () => {
      beforeEach('insert employee', () =>
        helpers.seedEmployees(
          db,
          makeTestEmployees
        )
      )
      it(`GET /employees responds with 200 and all the employees`, () => {
        return supertest(app)
          .get('/api/employees')
          .expect(200)
      })
    })
  })
})


