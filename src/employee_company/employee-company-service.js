const CompanyInfo = {

    getAllCompanyInfo(knex) {
        return knex('company').select('*');
    },

    getById(knex, id) {
        return knex('company').select('*').where({ id }).first();
    }


}

module.exports = CompanyInfo;