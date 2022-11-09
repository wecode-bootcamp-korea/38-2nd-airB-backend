const reservationDao = require('../models/reservationDao');

const getReservationByUserId = async (userId) => {
    return await reservationDao.getReservationByUserId(userId);
}

const postReservation =  async ( productId, userId, checkIn, checkOut, guestCount, stayLength ) => {
    return await reservationDao.validationChecker( productId, userId, checkIn, checkOut, guestCount, stayLength );
}
module.exports = {
    getReservationByUserId,
    postReservation
}
