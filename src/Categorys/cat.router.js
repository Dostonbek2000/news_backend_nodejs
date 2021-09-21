const router = require('express').Router();
const validate = require("express-validation");

const Validator = require('./catvalidator');
const Controller = require('./catcontroller');

router.route('/').get(Controller.findAll);
router.route('/').post(validate(Validator.addNew),Controller.create);
router.route('/:id').get(Controller.findOne);
router.route('/:id').put(validate(Validator.updateOne),Controller.update);
router.route('/:id').delete(validate(Validator.deleteOne),Controller.delete)


module.exports = router;
