const productService = require('../services/productService');
const { catchAsync } = require('../utils/error');

const getProductDetails = catchAsync(async (req, res) => {
    const detail = await productService.getProductDetailsByProductId(productId);

    return res.status(200).json({ data : detail });
})

const getFilteredOption = catchAsync (async (req, res) => {

    const { lowprice, highprice, bed, bathroom, bedroom, apartmentType, guesthouseType, hotelType, themeId, guest, city, checkIn, checkOut, limit, offset} = req.query;

    const result = await productService.getFilteredOption(lowprice, highprice, bed, bathroom, bedroom, apartmentType, guesthouseType, hotelType, themeId, guest, city, checkIn, checkOut, limit, offset);
    
    res.status(200).json({data : result});

});

module.exports = {
    getProductDetails,
    getFilteredOption
}

