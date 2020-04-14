const EmployeeService = {

    getAllEmployess(knex) {
        return knex('personal').select('*');
    },

    getById(knex, id) {
        return knex('personal').select('*').where({ id }).first();
    }


}

module.exports = EmployeeService;