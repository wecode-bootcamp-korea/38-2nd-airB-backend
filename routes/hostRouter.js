const hostRouter = require('express').Router();
const hostController = require('../controllers/hostController');
const imageUploader = require('../imageUploader');
const { loginRequired } = require('../utils/auth')

hostRouter.post('', loginRequired, imageUploader, hostController.hostingProductByUserId);

module.exports = hostRouter;