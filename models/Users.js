const { Sequelize } = require('sequelize');

const sequelize = require('../conexion/database');

const Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  tipo: Sequelize.INTEGER,
});

module.exports = Users;
