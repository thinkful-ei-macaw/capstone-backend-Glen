const knex = require('knex');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Auth Endpoints', () => {
    let db;

    const { testUsers } = helpers.makeFixtures();
    const testUser = testUsers[0];

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db);
    });
    after('disconnect from db', () => db.destroy());
    before('cleanup tables', () => helpers.cleanTables(db));
    afterEach('cleanup tables', () => helpers.cleanTables(db));

    describe('POST /api/auth/login', () => {
        beforeEach('insert users', () => helpers.seedUsers(db, testUsers));
        const requiredFields = ['username', 'password'];

        requiredFields.forEach((field) => {
            const loginAttemptBody = {

                username: testUser.username,
                password: testUser.password,
            };
            it(`Responds with 400 required error when '${field}' is missing`, () => {
                delete loginAttemptBody[field];

                return supertest(app)
                    .post('/api/auth/login')
                    .send(loginAttemptBody)
                    .expect(400, { error: `Missing '${field}' in request body` });
            });
        });
        it(`Responds 400 'Invalid username or password' when bad username`, () => {
            const userInvalidUsername = {

                username: 'wrong',
                password: 'nope',
            };


            return supertest(app)
                .post('/api/auth/login')
                .send(userInvalidUsername)
                .expect(400, { error: `Incorrect username or password` });
        });
        it(`Responds 400 'Invalid username or password' when bad password`, () => {
            const userInvalidPassword = {
                username: 'wrongAgain',
                password: 'incorrect',
            };
            return supertest(app)
                .post('/api/auth/login')
                .send(userInvalidPassword)
                .expect(400, { error: 'Incorrect username or password' });
        });
        it(`Responds 200 and JWT auth Token and user ID using secret when valid`, done => {
            done();
            const userValid = {
                username: testUser.username,
                password: testUser.password,
            };
            const expectedToken = jwt.sign(
                { user_id: testUser.id },
                process.env.JWT_SECRET,
                {
                    subject: testUser.username,
                    algorithm: 'HS256',
                }
            );
            const expectedID = testUser.id;

            return supertest(app).post('api/auth/login').send(userValid).expect(200, {
                authToken: expectedToken,
                user_id: expectedID,
            });
        });
    });

});