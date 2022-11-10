const reservationRouter = require('express').Router();
const reservationController = require('../controllers/reservationController');
const { loginRequired } = require('../utils/auth')

reservationRouter.get('/user/:userId', reservationController.getReservationByUserId);
reservationRouter.post('', loginRequired, reservationController.postReservation);

module.exports = reservationRouter;