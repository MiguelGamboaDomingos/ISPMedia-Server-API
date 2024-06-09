const { Sequelize } = require('sequelize');
const UserModel = require('../models/User');

// Carregar as variáveis de ambiente
require('dotenv').config();

// Configurações de conexão com o banco de dados
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Testar conexão com o banco de dados
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
}

// Definir modelos
const User = UserModel(sequelize);

// Sincronizar modelos com o banco de dados
async function syncModels() {
  try {
    await sequelize.sync();
    console.log('Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('Erro ao sincronizar modelos com o banco de dados:', error);
  }
}

module.exports = {
  sequelize,
  testConnection,
  syncModels,
  models: {
    User,
  },
};
