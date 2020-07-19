const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('manualesproyecto', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
