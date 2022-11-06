const reservationService = require('../services/reservationService');
const { catchAsync } = require('../utils/error');

const getReservationByUserId = catchAsync(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const reservationInfo = await reservationService.getReservationByUserId(userId);

    return res.status(200).json({ data : reservationInfo });
})

module.exports = {
    getReservationByUserId
}