const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function makeUsersArray() {
    return [
        {
            id: 1,
            username: 'TestUser1',
            password: 'password',



        },

        {
            id: 2,
            username: 'TestUser2',
            password: 'password',



        }
    ]
}

function makeCareersArray() {

    return [
        {
            id: 1,
            position: 'TestPosition1',
            salary: '10000',
            modified: new Date().toJSON()

        },
        {

            id: 2,
            position: 'TestPosition2',
            salary: '20000',
            modified: new Date().toJSON()


        }
    ]


}



function makeEmployeesArray(users, careers) {
    return [

        {
            id: 1,
            first_name: 'test-first-name-1',
            last_name: 'test-last-name-1',
            address: '123 some street',
            city: 'Some City',
            state: 'CA',
            zip_code: '92801',
            phone: '123-456-7890',
            career_id: careers[0].id,
            user_id: users[0].id,

        },

        {
            id: 2,
            first_name: 'test-first-name-2',
            last_name: 'test-last-name-2',
            address: '123 some street',
            city: 'Some City',
            state: 'CA',
            zip_code: '92801',
            phone: '123-456-7890',
            career_id: careers[1].id,
            user_id: users[1].id,

        }


    ]
}

function makeFixtures() {

    const testUsers = makeUsersArray();
    const testCareers = makeCareersArray();
    const testEmployees = makeEmployeesArray(testUsers, testCareers);

    return { testUsers, testCareers, testEmployees };


}


function cleanTables(db) {
    return db.transaction(trx => (
        trx.raw(
            `TRUNCATE
                employees,
                users,
                careers
                restart identity cascade
                  `
        )
            .then(() =>
                Promise.all([
                    trx.raw(`ALTER SEQUENCE employees_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE careers_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`SELECT setval('employees_id_seq', 0)`),
                    trx.raw(`SELECT setval('users_id_seq', 0)`),
                    trx.raw(`SELECT setval('careers_id_seq', 0)`),
                ])
            )
    )
    )
}


function seedUsers(db, users) {

    const preppedUsers = users.map((user) => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }));
    return db
        .into('users')
        .insert(preppedUsers)
        .then(() =>
            db.raw(
                `SELECT setval('users_id_seq', ?)`,
                [users[users.length - 1].id,
                ])
        );
}

function seedCareers(db, careers, users) {

    const preppedCareers = careers.map(career => ({
        ...career
    }));
    seedUsers(db, users);
    console.log(users, careers)
    return db
        .into('careers')
        .insert(preppedCareers)
        .then(() =>
            db.raw(
                `SELECT setval('careers_id_seq', ?)`,
                [careers[careers.length - 1].id,
                ])
        );
}
function seedOtherTables(db, users, careers) {
    return db.transaction(async (trx) => {
        await seedUsers(trx, users);
        await seedCareers(trx, careers);
    })
}


function seedEmployees(db, users, employees, careers) {

    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await seedCareers(trx, careers)
        await trx.into('employees').insert(employees)
        await trx.raw(
            `SELECT setval('employees_id_seq', ?)`,
            [employees[employees.length - 1].id],
        )
    })

}


function makeAuthHeader(user) {
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({
        user_id: user.id
    }, secret, {
        subject: user.username,
        algorithm: 'HS256',
    })
    return `Bearer ${token}`
}


module.exports = {

    makeUsersArray,
    makeCareersArray,
    makeEmployeesArray,
    makeFixtures,
    cleanTables,
    seedUsers,
    seedCareers,
    seedEmployees,
    makeAuthHeader,
    seedOtherTables

}