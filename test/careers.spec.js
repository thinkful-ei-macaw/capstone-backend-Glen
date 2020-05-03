const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Career Endpoints', () => {
    let db;

    const { testUsers, testCareers } = helpers.makeFixtures();
    const testUser = testUsers[0];
    const testCareer = testCareers[0];


    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy());
    before('cleanup tables', () => helpers.cleanTables(db));
    afterEach('cleanup tables', () => helpers.cleanTables(db));

    describe(`GET /api/careers`, () => {
        context(`Given no careers`, () => {
            beforeEach('insert users', () =>
                helpers.seedUsers(db, testUsers)
            )
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/careers')
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .expect(200, [])
            })
        })

        describe('GET /api/careers', () => {
            context('Given there are careers in the database', () => {
                beforeEach('insert careers', () =>
                    helpers.seedCareers(db, testCareers, testUsers)
                );

                it('responds with 200 and all the careers', () => {
                    return supertest(app)
                        .get('/api/careers')
                        .set('Authorization', helpers.makeAuthHeader(testUser))
                        .expect(200, testCareers)
                })
            })
        })


        describe('POST /api/careers', () => {
            context('Give there are careers to post in the database', () => {
                it(`creates a new career, responding with 201 and the new career`, function () {
                    beforeEach('Insert data', () =>
                        helpers.seedCareers(db, testCareers, testUsers)
                    )
                    this.retries(3)
                    const newCareer = {
                        position: 'Career1',
                        salary: '10000',
                    }
                    return supertest(app)
                        .post('/api/careers')
                        .set('Authorization', helpers.makeAuthHeader(testUser))
                        .send(newCareer)
                        .expect(201)
                        .expect(res => {
                            expect(res.body.position).to.eql(newCareer.position)
                            expect(res.body).to.have.property('id')
                            expect(res.body).to.have.property('position')
                            expect(res.body).to.have.property('salary')
                            expect(res.body).to.have.property('modified')
                        })


                })
            })

        })


        describe('DELETE /api/careers/:career_id', () => {
            context('Given no career', () => {
                beforeEach('insert users', () =>
                    helpers.seedOtherTables(db, testUsers, testCareers)
                )
                it('responds with 404', () => {
                    const careerID = 12345
                    return supertest(app)
                        .delete(`/api/careers/${careerID}`)
                        .set('Authorization', helpers.makeAuthHeader(testUser))
                        .expect(404, {
                            error: {
                                message: 'Career does not exist'
                            }
                        })
                })
            })
        })

        describe('GET /api/careers/:career_id', () => {
            it('should return a career', function () {
                const id = 1

                return supertest(app)
                    .get(`/api/careers/${id}`)
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .expect(200)
            })
        })

        describe('PATCH /api/careers/:career_id', () => {
            it('Should update a career', function () {
                const id = 1

                const newCareer = {
                    position: 'NewPosition'
                }
                return supertest(app)
                    .patch(`/api/careers/${id}`)
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .send(newCareer)
                    .expect(200)
            })
        })




    })

})