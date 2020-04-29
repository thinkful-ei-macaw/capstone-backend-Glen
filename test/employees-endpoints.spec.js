const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers')

const { TEST_DATABASE_URL } = require('../src/config');
const { makeTestEmployees } = helpers.makeTestEmployees();



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


  // GET requests (READ)
  describe(`GET /api/employees`, () => {
    context(`Given no employees`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/employees')


      })
      it('responds with 200 and all the employees', () => {
        return supertest(app)
          .get('/api/employees')
      })
      it('responds with 200 and all the careers', () => {
        return supertest(app)
          .get('/api/careers')
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
})

//   context(`Given there are employees in the '${table_name}' table`, () => {
//     beforeEach('insert employee', () => {
//       const employeeTables = helpers.makeTestEmployee();
//       return db
//         .into(table_name)
//         .insert(employeeTables);
//     });

//     it(`GET '${endpoint}' responds with 200 with an array of items`, () => {
//       return supertest(app)
//         .get(endpoint)
//         .expect(200, testEmployees);
//     });

//     it(`GET ${endpoint}/:id responds with 200 with the requested item`, () => {
//       const expected = randomEmployee();
//       const { id } = expected;
//       return supertest(app)
//         .get(endpoint + '/' + id)
//         .expect(200, expected);
//     });

//   });

//   context(`Given no items in the '${table_name}' table`, () => {
//     it(`GET ${endpoint} responds with 200 with an empty array`, () => {
//       return supertest(app)
//         .get(endpoint)
//         .expect(200, []);
//     });

//     it(`GET ${endpoint}/:id responds with 404`, () => {
//       const id = 2;
//       return supertest(app)
//         .get(endpoint + '/' + id)
//         .expect(404);
//     });
//   });

// });