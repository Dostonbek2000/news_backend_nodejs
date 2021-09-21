const Joi = require("@hapi/joi");

module.exports = {
  auth: {
    body: {
      login: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  addNew: {
    body: {
      login: Joi.string().required(),
      password: Joi.string().required(),
      username: Joi.string().required(),
      published: Joi.string().required(),
      active: Joi.boolean().default(true)
    }
  },

  updateOne: {
    params: {
      id: Joi.string().required()
    },
    body: {
        login: Joi.string().required(),
        password: Joi.string().required(),
        username: Joi.string().required(),
        published: Joi.string().required(),
    //   lat: Joi.number(),
    //   lng: Joi.number(),
    //   active: Joi.boolean().default(true)
    }
  },

  deleteOne: {
    params: {
      id: Joi.string().required()
    }
  }
}