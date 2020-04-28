// const { API_TOKEN } = require('../config');

const AuthService = require('../auth/auth-service')




//   Checks for a correct Bearer token authorization header

function auth(req, res, next) {
    const authToken = req.get('Authorization') || '';
    console.log(authToken)
    let bearerToken;

    if (!authToken.toLowerCase().startsWith('bearer')) {
        return res
            .status(401)
            .json({
                error: { message: 'Missing bearer token' }
            });
    } else {
        bearerToken = authToken.slice(7, authToken.length);
    }

    try {
        const payLoad = AuthService.verifyJwt(bearerToken);
        AuthService.getUserWithUserName(
            req.app.get('db'),
            payLoad.sub
        )
            .then(user => {
                if (!user)
                    return res.status(401).json({
                        error: 'Unauthorized request'
                    });
                req.user = user;
                next();
            })
            .catch(err => {
                next(err)
            })
    } catch (error) {
        res.status(401).json({
            error: 'Unathorized request'
        });
    }


}

module.exports = {
    auth,
};