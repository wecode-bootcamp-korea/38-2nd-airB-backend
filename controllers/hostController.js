const hostService = require('../services/hostService');
const { catchAsync } = require('../utils/error');

const hostingProductByUserId = catchAsync(async (req, res) => {
        
    const userId = req.user.userId;
    
    const { title, price, latitude, longitude, description, bed, bedroom, bathroom,
        guestMax, buildingTypeId, cityId, themeId, hostDescription } = req.body;
        
    const images = req.files.map(file=>file.location);

    if( !title || !price || !latitude || !longitude || !description || !bed || !bedroom || !bathroom 
        || !guestMax || !buildingTypeId || !cityId || !themeId || !hostDescription || images ) { 
            const error = new Error('KEY_ERROR');
            error.statusCode = 400;
            throw error;
        }
    await hostService.hostingProductByUserId( userId, title, price, latitude, longitude, description,
          bed, bedroom, bathroom, guestMax, buildingTypeId, cityId, themeId, hostDescription, images )
    
    res.status(201).json({ message : 'SUCCESS' });
})

module.exports = {
    hostingProductByUserId
}