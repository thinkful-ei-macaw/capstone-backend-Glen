const path = require('path');
const express = require('express');
const xss = require('xss');
const EmployeeService = require('./employee-service')

const employeeRouter = express.Router();

const serializeEmployee = employee => ({
    id: employee.id,
    first_name: xss(employee.first_name),
    last_name: xss(employee.last_name),
    address: xss(employee.address),
    city: xss(employee.city),
    state: xss(employee.state),
    zip_code: xss(employee.zip_code),
    phone: xss(employee.phone),
    modified: employee.modified
})

employeeRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        console.log(knexInstance)
        EmployeeService.getAllEmployess(knexInstance)
            .then(employees => {
                res.json(employees.map(serializeEmployee))
            })
            .catch(next)
    })

employeeRouter
    .route('/:id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db');
        EmployeeService.getById(knexInstance, req.params.id)
            .then(employee => {
                if (!employee) {
                    return res.status(404).json({
                        error: {
                            message: `Employee does not exist`
                        }
                    });
                }
                res.employee = employee;
                next();
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeEmployee(res.employee))
    })

module.exports = employeeRouter;