const CareerService = {

    getAllCareerInfo(knex) {
        return knex('careers').select('*');
    },

    getById(knex, id) {
        return knex('careers').select('*').where({ id }).first();
    },

    insertCareer(knex, newCareer) {
        return knex
            .insert(newCareer)
            .into('careers')
            .returning('*')
            .then(rows => rows[0]);
    },

    deleteCareer(knex, id) {
        return knex('careers').where({ id }).delete();
    },

    updateCareer(knex, id, newCareerFields) {
        return knex('careers').where({ id }).update(newCareerFields)
    }


};

module.exports = CareerService;