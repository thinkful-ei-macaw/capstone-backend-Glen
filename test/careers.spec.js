// const knex = require('knex');
// const app = require('../src/app');
// const helpers = require('./test-helpers');

// describe('Career Endpoints', function () {
//     let db;

//     const { testUsers, testCareers } = helpers.makeFixtures();
//     const testUser = testUsers[0];
//     const testCareer = testCareers[0];


//     before('make knex instance', () => {
//         db = knex({
//             client: 'pg',
//             connection: process.env.TEST_DATABASE_URL,
//         })
//         app.set('db', db)
//     })

//     after('disconnect from db', () => db.destroy());
//     before('cleanup tables', () => helpers.cleanTables(db));
//     afterEach('cleanup tables', () => helpers.cleanTables(db));

//     describe(`GET /api/careers`, () => {
//         context(`Given no careers`, () => {
//             beforeEach('insert users', () =>
//                 helpers.seedUsers(db, testUsers)
//             )
//             it(`responds with 200 and an empty list`, () => {
//                 return supertest(app)
//                     .get('/api/careers')
//                     .set('Authorization', helpers.makeAuthHeader(testUser))
//                     .expect(200, [])
//             })
//         })

//         context('Given there are careers in the database', () => {
//             beforeEach('insert careers', () =>
//                 helpers.seedCareers(
//                     db,
//                     testCareer
//                 ))
//             it('responds with 200 and all the careers', () => {

//                 return supertest(app)
//                     .get('/api/careers')
//                     .set('Authorization', helpers.makeAuthHeader(testUser))
//                     .expect(200, testCareer)
//             })
//         })

//         describe('POST /api/careers', () => {
//             it(`creates a new career, responding with 201 and the new career`, function () {
//                 this.retries(3)
//                 const newCareer = {
//                     position: 'Career1',
//                     salary: '10000',
//                 }
//                 return supertest(app)
//                     .post('/api/careers')
//                     .set('Authorization', helpers.makeAuthHeader(testUser))
//                     .send(newCareer)
//                     .expect(201)
//                     .expect(res => {
//                         expect(res.body.postion).to.eql(newCareer.postion)
//                         expect(res.body).to.have.property('id')
//                         expect(res.body).to.have.property('position')
//                         expect(res.body).to.have.property('salary')
//                         expect(res.body).to.have.property('modified')
//                     })

//             })
//         })


//     })

// })