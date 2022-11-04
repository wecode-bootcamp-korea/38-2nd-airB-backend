const productService = require('../services/productService');
const { catchAsync } = require('../utils/error');

const getProductDetails = catchAsync(async (req, res) => {
    const productId = parseInt(req.params.productId);
    const detail = await productService.getProductDetailsByProductId(productId);

    return res.status(200).json({ data : detail });
})

module.exports = {
    getProductDetails
}