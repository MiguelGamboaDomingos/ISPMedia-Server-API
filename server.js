require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const { testConnection, syncModels } = require('./config/sequelize');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

// Conectar ao banco de dados e iniciar o servidor
(async () => {
  await testConnection();
  await syncModels();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})();
