const CareerInfo = {

    getAllCareerInfo(knex) {
        return knex('careers').select('*');
    },

    getById(knex, id) {
        return knex('careers').select('*').where({ id }).first();
    }


}

module.exports = CareerInfo;