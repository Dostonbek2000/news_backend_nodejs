const Joi = require('@hapi/joi');

module.exports = {
    auth:{
        body:{
            name:Joi.string().required(),
            password: Joi.string().required()
        }
    },
    addNew:{
        body:{
            name:Joi.string().required(),
            color:Joi.string().required(),
            active:Joi.boolean().default(true),
        }
    },
    updateOne:{
        params:{
            id:Joi.string().required()
        },
        body:{
            name:Joi.string().required(),
            color:Joi.string().required(),
        }
    },
    deleteOne: {
        params: {
          id: Joi.string().required()
        }
      }

}