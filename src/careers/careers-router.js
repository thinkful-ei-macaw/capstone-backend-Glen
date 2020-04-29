const path = require('path');
const express = require('express');
const xss = require('xss');
const CareerService = require('./careers-service');
const { authorization } = require('../middleware/auth');

const careerRouter = express.Router();
const jsonParser = express.json();

careerRouter.use(authorization);

const serializeCareer = career => ({
    id: career.id,
    position: xss(career.position),
    salary: xss(career.salary),
    modified: career.modified
});

careerRouter
    .route('/')
    .get(authorization, (req, res, next) => {
        const knextInstance = req.app.get('db');
        CareerService.getAllCareerInfo(knextInstance)
            .then(careers => {
                res.json(careers.map(serializeCareer))
            })
            .catch(next)
    })
    .post(authorization, jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db');
        console.log(knexInstance)
        const { position, salary } = req.body;

        if (!position || !salary) {
            return res.status(400).json({
                error: {
                    message: 'All fields must be contain info'
                }
            });
        }
        const newCareer = {
            position, salary
        };

        CareerService.insertCareer(knexInstance, newCareer).then(career =>
            res
                .status(201)
                .location(path.posix.join(req.originalUrl + `/${career.id}`))
                .json(serializeCareer(career))

        );

    });


careerRouter
    .route('/:career_id')
    .all(authorization, (req, res, next) => {
        const knexInstance = req.app.get('db')
        CareerService.getById(knexInstance, req.params.career_id)
            .then(career => {
                if (!career) {
                    return res.status(404).json({
                        error: {
                            message: `career info not found`
                        }
                    });
                }
                res.career = career;
                next();
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeCareer(res.career))
    })
    .delete(authorization, (req, res, next) => {
        const knexInstance = req.app.get('db');
        CareerService.deleteCareer(knexInstance, req.params.career_id)
            .then(() => {
                res.status(204).end();
            })
            .catch(next)
    })
    .patch(authorization, jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db');
        const { position, salary } = req.body;
        const updateCareer = { position, salary }

        const numberOfValues = Object.values(updateCareer).filter(Boolean).length;
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Your request body must contain, 'postion or salary'`
                }
            });
        }
        CareerService.updateCareer(knexInstance, req.params.career_id, updateCareer)
            .then(() => {
                res.status(204).end();
            })

    });

module.exports = careerRouter;


