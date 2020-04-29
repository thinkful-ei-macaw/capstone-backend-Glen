const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function makeUsersArray() {
    return [
        {
            id: 1,
            username: 'TestUser1',
            password: 'password'


        },

        {
            id: 2,
            username: 'TestUser2',
            password: 'password'


        }
    ]
}



function makeEmployeesArray() {
    return [

        {
            id: 3,
            first_name: 'test-first-name-1',
            last_name: 'test-last-name-1',
            address: '123 some street',
            city: 'Some City',
            state: 'CA',
            zip_code: '92801',
            phone: '123-456-7890',
            career_id: 1,
            user_id: 1,

        },

        {
            id: 4,
            first_name: 'test-first-name-2',
            last_name: 'test-last-name-2',
            address: '123 some street',
            city: 'Some City',
            state: 'CA',
            zip_code: '92801',
            phone: '123-456-7890',
            career_id: 2,
            user_id: 2,

        }


    ]
}





function makeTestEmployees() {
    const testEmployee = makeEmployeesArray()
    return testEmployee

}

function makeTestUsers() {
    const testUser = makeUsersArray();
    return testUser
}


function cleanTables(db) {
    return db.transaction(trx => (
        trx.raw(
            `TRUNCATE
                employees
                  `
        )
            .then(() =>
                Promise.all([
                    trx.raw(`ALTER SEQUENCE employees_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`SELECT setval('employees_id_seq', 0)`)
                ])
            )
    )
    )
}


function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('users').insert(preppedUsers)
        .then(() =>
            // update the auto sequence to stay in sync
            db.raw(
                `SELECT setval('commit_users_id_seq', ?)`,
                [users[users.length - 1].id],
            )
        )
}


function seedEmployees(db, employees) {

    const preppedUsers = employees.map(employee => ({
        ...employee
    }));
    return db
        .into('employees')
        .insert(preppedUsers)
        .then(() =>
            db.raw(`SELECT setval('employees_id_seq', ?)`,
                [employees[employees.length - 1].id],
            )
        );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {

    const token = jwt.sign({
        user_id: user.id
    }, secret, {
        subject: user.username,
        algorithm: 'HS256',
    })
    return `Bearer ${token}`
}


module.exports = {

    makeEmployeesArray,
    makeTestEmployees,
    cleanTables,
    seedEmployees,
    seedUsers,
    makeAuthHeader,
    makeTestUsers


}