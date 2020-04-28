const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeEmployeesArray() {
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
            career_id: 1,
            user_id: 1
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
            career_id: 1,
            user_id: 1
        }


    ]
}

function makeTestEmployee() {
    const testEmployee = makeEmployeesArray()
    return {
        testEmployee
    }
}



// function makeEmployee(task) {
//     return {
//         id: task.id,
//         firstName: task.first_name,
//         lastName: task.last_name,
//         address: task.address,
//         city: task.city,
//         state: task.state,
//         zipCode: task.zip_code,
//         phone: task.phone,
//         careerId: task.career_id,
//         userId: task.user_id

//     }
// }

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

function seedEmployees(db, employees) {
    const preppedUsers = employees.map(employee => ({
        ...employee
    }));
    return db
        .into("employees")
        .insert(preppedUsers)
        .then(() =>
            db.raw(`SELECT setval('employees_id_seq', ?)`, [
                employees[employees.length - 1].id,
            ])
        );
}



module.exports = {

    makeEmployeesArray,
    makeTestEmployee,
    cleanTables,
    seedEmployees,


}