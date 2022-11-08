const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/signin', userController.signIn);

module.exports = router;