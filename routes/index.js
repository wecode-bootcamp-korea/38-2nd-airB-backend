const router = require('express').Router();

const productRouter = require('./productRouter');
const reservationRouter = require('./reservationRouter');

router.use('/product',productRouter);
router.use('/reservation', reservationRouter);

module.exports = router;