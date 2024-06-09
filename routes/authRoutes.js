const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Rota para registrar
router.post('/register', register);

// Rota para login
router.post('/login', login);

module.exports = router;
