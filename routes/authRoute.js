const express = require('express');
const { login, logout, register } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

module.exports = router;
