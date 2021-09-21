const Joi = require('@hapi/joi');

module.exports = {
    auth: {
        body: {
            username: Joi.string().min(3).max(100).required(),
            password: Joi.string().min(3).max(100).required()
        }
    }
}