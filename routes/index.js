const router = require('express').Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const reservationRouter = require('./reservationRouter');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/reservation', reservationRouter);

module.exports = router;