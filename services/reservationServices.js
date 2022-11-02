const reservationDao = require('../models/reservationDao');

const postReservation =  async ( productId, userId, checkIn, checkOut, guestCount, stayLength ) => {
    
    return await reservationDao.validationChecker( productId, userId, checkIn, checkOut, guestCount, stayLength );

}

module.exports = {
    postReservation
}