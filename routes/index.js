const router = require('express').Router();

const productRouter = require('./productRouter');

router.use('/product',productRouter);

module.exports = router;