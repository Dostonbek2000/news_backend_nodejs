var router = require("express").Router();
const validate = require('express-validation');
const authenticate = require('../util/authenticate');
const permit = require('./../util/permission');

const Validator = require('./validator');
const Controller = require('./user.controller');


router.route('/auth').post(validate(Validator.auth), Controller.auth);


router.use(authenticate);


router.use(permit('admin'));
router.route('/').post(validate(Validator.addNew), Controller.create);
router.route('/').get( Controller.findAll);
router.route('/published').get( Controller.findAllPublished);
router.route('/:id').get(Controller.findOne);
router.route('/:id').put(validate(Validator.updateOne),Controller.update);
router.route('/:id').delete(validate(Validator.deleteOne),Controller.delete);
router.route('/').delete(Controller.deleteAll);



module.exports = router