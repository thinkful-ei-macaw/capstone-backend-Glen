const path = require('path');
const express = require('express');
const xss = require('xss');
const CareerInfo = require('./careers-service');

const careerRouter = express.Router();

const serializeCareer = career => ({
    id: career.id,
    position: xss(career.position),
    salary: xss(career.salary),
    modified: career.modified

});

careerRouter
    .route('/')
    .get((req, res, next) => {
        const knextInstance = req.app.get('db');
        CareerInfo.getAllCareerInfo(knextInstance)
            .then(careers => {
                res.json(careers.map(serializeCareer))
            })
            .catch(next)
    });


careerRouter
    .route('/:career_id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db')
        CareerInfo.getById(knexInstance, req.params.career_id)
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
    });

module.exports = careerRouter;


