const router = require('express').Router();



//buyerda routerlar chaqirirladi 
const adminRouter = require('./admin/router');
const UserRouter = require('./Users/user.router');
const CategoryRouter = require('./Categorys/cat.router')
const newsRouter = require('./News/router')



//buyerda table lar
router.use('/users', UserRouter);
router.use('/category',CategoryRouter);
router.use('/news',newsRouter)
router.use('/admin',adminRouter);





module.exports = router;