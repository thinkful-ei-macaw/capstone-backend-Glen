const path = require('path');
const express = require('express');
const xss = require('xss');
const EmployeeService = require('./employee-service')

const employeeRouter = express.Router();
const jsonParser = express.json();

const serializeEmployee = employee => ({

    id: employee.id,
    first_name: xss(employee.first_name),
    last_name: xss(employee.last_name),
    address: xss(employee.address),
    city: xss(employee.city),
    state: xss(employee.state),
    zip_code: xss(employee.zip_code),
    phone: xss(employee.phone),
    modified: employee.modified,
    career_id: employee.career_id,
    user_id: employee.user_id
})


employeeRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        EmployeeService.getAllEmployess(knexInstance)
            .then(employees => {
                res.json(employees.map(serializeEmployee))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db');
        const { first_name, last_name, address, city, state, zip_code, phone, career_id, user_id } = req.body;
        if (!first_name || !last_name || !address || !city || !state || !zip_code || !phone || !career_id || !user_id) {
            return res.status(400).json({
                error: {
                    message: 'All request body fields must contain info'
                }
            });
        }
        const newEmployee = {
            first_name, last_name, address, city, state, zip_code, phone, career_id, user_id
        };
        EmployeeService.insertEmployee(knexInstance, newEmployee).then(employee => {
            console.log(employee),
                console.log(serializeEmployee(employee))
            res
                .status(201)
                .location(path.posix.join(req.originalUrl + `/${employee.id}`))
                .json(serializeEmployee(employee))
        }
        )

    });

employeeRouter
    .route('/:employee_id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db');
        EmployeeService.getById(knexInstance, req.params.employee_id)
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
    .delete((req, res, next) => {
        const knexInstance = req.app.get('db');

        EmployeeService.deleteEmployee(knexInstance, req.params.employee_id)
            .then(() => {
                res.status(201).json({});
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { first_name, last_name, address, city, state, zip_code, phone, career_id, user_id } = req.body;
        const updateEmployee = { first_name, last_name, address, city, state, zip_code, phone, career_id, user_id };
        const numberOfValues = Object.values(updateEmployee).filter(Boolean).length;
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: 'Your request body must contain at least one of the fields'
                }
            });

        }


        EmployeeService.updateEmployee(knexInstance, req.params.employee_id, updateEmployee)
            .then(employee => {
                console.log(employee)
                console.log(serializeEmployee(employee[0]))
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${employee[0].id}`))
                    .json(serializeEmployee(employee[0]))

            })

    })

module.exports = employeeRouter;