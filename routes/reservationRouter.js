const reservationRouter = require('express').Router();
const reservationController = require('../controllers/reservationController');

reservationRouter.post('/:productId', reservationController.postReservation);

module.exports = reservationRouter;
