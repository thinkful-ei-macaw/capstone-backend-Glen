const UserService = {
    getAllUsers(knex) {
        return knex('users').select('*');
    },

    getById(knex, id) {
        return knex('users').select('*').where({ id }).first();
    },

    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(rows => rows[0]);
    },
    deleteUser(knex, id) {
        return knex('users').where({ id }).delete();
    },

    updateUser(knex, id, newUserFields) {
        return knex('users').where({ id }).update(newUserFields);
    }
}

module.exports = UserService;