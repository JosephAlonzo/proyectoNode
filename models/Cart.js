const { Sequelize } = require('sequelize');

const sequelize = require('../conexion/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_producto: Sequelize.INTEGER,
  id_user: Sequelize.INTEGER,
  titulo: Sequelize.STRING,
  precio: Sequelize.STRING,
  autor: Sequelize.STRING,
  imagen: Sequelize.TEXT,
});

module.exports = Cart;
