const productRouter = require('express').Router();
const productController = require('../controllers/productController');

productRouter.get('/:productId', productController.getProductDetails);

module.exports = productRouter;