const productDao = require('../models/productDao');

const getProductDetailsByProductId = async (productId) => {
    return await productDao.getProductDetailsByProductId(productId);
}

module.exports = {
    getProductDetailsByProductId
}