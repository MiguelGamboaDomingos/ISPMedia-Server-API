// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { models } = require('../config/sequelize');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar se o usuário já existe
    const existingUser = await models.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Criar novo usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await models.User.create({
      username,
      email,
      password: hashedPassword
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Gerar token JWT
    const payload = {
      userId: user.id,
      username: user.username,
      isAdmin: user.isAdmin
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};

module.exports = { register, login };
