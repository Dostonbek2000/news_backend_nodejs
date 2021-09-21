const Joi = require("@hapi/joi");

module.exports = {
    auth: {
        body: {
            cat_id: Joi.string().required(),
            title: Joi.string().required(),
            text: Joi.string().required(),
            author: Joi.string().required(),
            date: Joi.date().required(),
            image: Joi.string().required(),


        }
    },

    addNew: {
        body: {
            cat_id: Joi.string().required(),
            title: Joi.string().required(),
            text: Joi.string().required(),
            author: Joi.string().required(),
            date: Joi.date().required(),
            image: Joi.string().required(),
            active: Joi.boolean().default(true)
        }
    },

    updateOne: {
        params: {
            id: Joi.string().required()
        },
        body: {
            cat_id: Joi.string().required(),
            title: Joi.string().required(),
            text: Joi.string().required(),
            author: Joi.string().required(),
            date: Joi.date().required(),
            image: Joi.string().required(),
           
        }
    },

    deleteOne: {
        params: {
            id: Joi.string().required()
        }
    }
}