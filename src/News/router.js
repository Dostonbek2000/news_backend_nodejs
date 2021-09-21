const router = require('express').Router();
const validate = require("express-validation");
const multer = require('multer');
const Validator = require('./new.validator');
const Controller = require('./new.controller');


const Filestorageenginee = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/img')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: Filestorageenginee
});

router.route('/').get(Controller.findAll);
router.route('/').post(upload.single('file'),Controller.create);
router.route('/:id').get(Controller.findOne);
router.route('/:id').put(upload.single('file'),Controller.update);
router.route('/:id').delete(validate(Validator.deleteOne),Controller.delete)


module.exports = router;