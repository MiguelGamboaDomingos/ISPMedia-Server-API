const express = require('express');
const { auth, adminAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// Rota protegida para usuários autenticados
router.get('/protected', auth, (req, res) => {
    console.log('Solicitação GET para /api/protected recebida.');
    res.json({ message: 'This is a protected route.', user: req.user });
  });

// Rota protegida apenas para administradores
router.get('/admin', auth, adminAuth, (req, res) => {
  res.json({ message: 'This is an admin-only route.', user: req.user });
});

module.exports = router;
