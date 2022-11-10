const reservationService = require('../services/reservationService');
const { catchAsync } = require('../utils/error');

const postReservation = catchAsync(async (req, res) => {
    const userId = req.user.userId;
    
    const { productId, checkIn, checkOut, guestCount } = req.body;

    const stayLength = (Date.parse(checkOut) - Date.parse(checkIn))/1000/60/60/24

    if ( !userId || !checkIn || !checkOut || !guestCount|| !stayLength){
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }
    try{
        await reservationService.postReservation( productId, userId, checkIn, checkOut, guestCount, stayLength );
    
        res.status(201).json({message : 'reservation complete'});
    }catch (err) {
        const error = new Error('reservation failed');
        error.statusCode = 500;
        throw err;
    }
});

const getReservationByUserId = catchAsync(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const reservationInfo = await reservationService.getReservationByUserId(userId);

    return res.status(200).json({ data : reservationInfo });
})

module.exports = {
    getReservationByUserId,
    postReservation
}