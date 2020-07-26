const { Sequelize } = require('sequelize');

const sequelize = require('../conexion/database');


const Ventas_producto  = sequelize.define('ventas_productos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  titulo: Sequelize.STRING,
  cantidad: Sequelize.DOUBLE,
  descripcion: Sequelize.STRING,
  precio: Sequelize.DOUBLE,
  imagen: Sequelize.TEXT,
  autor: Sequelize.STRING,
  tecnologia: Sequelize.STRING
}, 
{
  freezeTableName: true,
  timestamps: false
});

module.exports = Ventas_producto ;
