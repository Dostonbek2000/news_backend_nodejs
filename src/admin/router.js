const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const Validator = require('./validator');
const Controller = require('./controller');

router.route('/auth').post(validate(Validator.auth), Controller.auth);

module.exports = router;