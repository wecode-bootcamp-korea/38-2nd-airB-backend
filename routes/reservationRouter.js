const reservationRouter = require('express').Router();
const reservationController = require('../controllers/reservationController');

reservationRouter.get('/user/:userId', reservationController.getReservationByUserId);

module.exports = reservationRouter;