const express = require('express')
const AuthService = require('./auth-service')

const {
    requireAuth
} = require('../middleware/auth');

const authRouter = express.Router()
const jsonBodyParser = express.json()


authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
        const { username, password } = req.body
        const loginUser = { username, password }
        console.log(loginUser)

        for (const [key, value] of Object.entries(loginUser)) {
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        }
        AuthService.getUserWithUserName(
            req.app.get('db'),
            loginUser.username,
            console.log(loginUser.username),
            console.log(loginUser.password)
            //test
        )
            .then(dbUser => {
                if (!dbUser)
                    return res.status(400).json({
                        error: 'Incorrect username or password1',
                    })
                return AuthService.comparePasswords(loginUser.password, dbUser.password)
                    .then(compareMatch => {
                        if (!compareMatch)
                            return res.status(400).json({
                                error: 'Incorrect username or password2',
                            })
                        console.log(loginUser.password)
                        console.log(dbUser.password)
                        const sub = dbUser.username
                        const payload = { user_id: dbUser.id }
                        res.send({
                            authToken: AuthService.createJwt(sub, payload),
                        })
                        console.log(authToken)
                    })
            })
            .catch(error => {
                next(error)
            })
    });



module.exports = authRouter