const EmployeeService = {

    getAllEmployess(knex) {
        return knex('employees').select('*');
    },

    getById(knex, id) {
        return knex('employees').select('*').where({ id }).first();
    },

    insertEmployee(knex, newEmployee) {
        return knex
            .insert(newEmployee)
            .into('employees')
            .returning('*')
            .then(rows => rows[0]);
    },

    deleteEmployee(knex, id) {
        return knex('employees').where({ id }).delete().returning('*');
    },

    updateEmployee(knex, id, newEmployeeFields) {
        return knex('employees').where({ id }).update(newEmployeeFields).returning('*')

    }


}

module.exports = EmployeeService;