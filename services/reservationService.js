const reservationDao = require('../models/reservationDao');

const getReservationByUserId = async (userId) => {
    return await reservationDao.getReservationByUserId(userId);
}

module.exports = {
    getReservationByUserId
}