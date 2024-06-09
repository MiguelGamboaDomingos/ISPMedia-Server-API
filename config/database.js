const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ispmedia_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Defina como true se quiser ver os logs de consultas SQL
});

// Autenticação e conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
  });

// Sincronização das tabelas com o banco de dados
sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Sincronização com o banco de dados concluída.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar com o banco de dados:', error);
  });

module.exports = sequelize;
