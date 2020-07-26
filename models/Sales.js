const { Sequelize } = require('sequelize');

const sequelize = require('../conexion/database');

const Sales = sequelize.define('sales', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_producto: Sequelize.INTEGER,
  cantidad: Sequelize.INTEGER,
});

module.exports = Sales;
