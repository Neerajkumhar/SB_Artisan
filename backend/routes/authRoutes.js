const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { validateLogin } = require('../middleware/validationMiddleware');

router.post('/login', validateLogin, login);

module.exports = router;
