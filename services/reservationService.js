const reservationDao = require('../models/reservationDao');

const getReservationByUserId = async (userId) => {
    return await reservationDao.getReservationByUserId(userId);
}

const postReservation =  async ( productId, userId, checkIn, checkOut, guestCount, stayLength ) => {
    const checkInDate = checkIn.split(',')[0]
    const checkOutDate = checkOut.split(',')[0]

    return await reservationDao.validationChecker( productId, userId, checkInDate, checkOutDate, guestCount, stayLength );
}
module.exports = {
    getReservationByUserId,
    postReservation
}
