const path = require('path');
const express = require('express');
const xss = require('xss');
const CompanyInfo = require('./employee-company-service');

const companyRouter = express.Router();

const serializeCompany = company => ({
    id: company.id,
    position: xss(company.position),
    salary: xss(company.salary)

});

companyRouter
    .route('/')
    .get((req, res, next) => {
        const knextInstance = req.get('db');
        CompanyInfo.getAllCompanyInfo(knextInstance)
            .then(companies => {
                res.json(companies.map(serializeCompany))
            })
            .catch(next)
    });


companyRouter
    .route('/:employee_id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db')
        CompanyInfo.getById(knexInstance, req.params.employee_id)
            .then(company => {
                if (!company) {
                    return res.status(404).json({
                        error: {
                            message: `Company employee info not found`
                        }
                    });
                }
                res.company = company;
                next();
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeCompany(res.company))
    });

module.exports = companyRouter;


