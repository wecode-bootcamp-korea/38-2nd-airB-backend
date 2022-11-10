const hostDao = require('../models/hostDao');

const hostingProductByUserId = async ( userId, title, price, latitude, longitude, description, 
      bed, bedroom, bathroom, guestMax, buildingTypeId, cityId, themeId, hostDescription, images ) => {
    
    return await hostDao.hostingProductByUserId( userId, title, price, latitude, longitude, description, 
                 bed, bedroom, bathroom, guestMax, buildingTypeId, cityId, themeId, hostDescription, images )
}

module.exports = {
    hostingProductByUserId
}