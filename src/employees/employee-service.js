const EmployeeService = {

    getAllEmployess(knex) {
        return knex('employees').select('*');
    },

    getById(knex, id) {
        return knex('employees').select('*').where({ id }).first();
    }


}

module.exports = EmployeeService;