const UserService = {
    getAllUsers(knex) {
        return knex('users').select('*');
    },

    getById(knex, id) {
        return knex('users').select('*').where({ id }).first();
    }
}

module.exports = UserService;