const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('manualesproyecto', 'root', '', {
//   dialect: 'mysql',
//   host: 'localhost',
// });

const sequelize = new Sequelize('manualesproyecto', 'manualeadmin@joseph-server', 'Peluso182', {
  dialect: 'mysql',
  host: 'joseph-server.mysql.database.azure.com',
});

// const sequelize = new Sequelize('manualesproyecto', 'root', '', {
//   dialect: 'mysql',
//   host: 'localhost',
//   logging: false
// });

module.exports = sequelize;
