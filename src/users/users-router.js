const path = require('path')
const express = require('express')
const xss = require('xss')
const UserService = require('./users-service')

const userRouter = express.Router();

const serializeUser = user => ({

    userName: xss(user.username),
    password: xss(user.password)

})

userRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        UserService.getAllUsers(knexInstance)
            .then(users => {
                res.json(users.map(serializeUser))
            })
            .catch(next)
    })

userRouter
    .route('/:id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db');
        UserService.getById(knexInstance, req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: {
                            message: 'User does not exist'
                        }
                    });
                }
                res.user = user;
                next();
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeUser(res.user))
    })

module.exports = userRouter;