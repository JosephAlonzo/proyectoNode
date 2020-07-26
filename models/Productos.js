const { Sequelize } = require('sequelize');

const sequelize = require('../conexion/database');

const Productos = sequelize.define('productos', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  titulo: Sequelize.STRING,
  descripcion: Sequelize.STRING,
  precio: Sequelize.DOUBLE,
  imagen: Sequelize.TEXT,
  autor: Sequelize.STRING,
  tecnologia: Sequelize.STRING,
  zip: Sequelize.TEXT,
  activo: Sequelize.INTEGER
});

module.exports = Productos;
