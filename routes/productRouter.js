const productRouter = require('express').Router();
const productController = require('../controllers/productController');

productRouter.get('/option', productController.getFilteredOption); 
productRouter.get('/:productId', productController.getProductDetails);

module.exports = productRouter;