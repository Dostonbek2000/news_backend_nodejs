const jwt = require('jsonwebtoken');
const bluebird = require('bluebird');
bluebird.promisifyAll(jwt);
const { ErrorHandler } = require('./error');

module.exports = async function(req, res, next) {
    let token = req.headers['token'];
    if (token) {
        try {
            const decoded = await jwt.verifyAsync(token, process.env.TOKEN_SECRET_KEY);
            if (!decoded) return next(new ErrorHandler(403, 'Error: Token is not valid'));
            req.identifier = decoded;
            return next();
        } catch (error) {
            return next(new ErrorHandler(403, 'Error: Authorization failed'));
        }

    } else {
        return next(new ErrorHandler(403, 'Error: Not authorized '));
    }
}