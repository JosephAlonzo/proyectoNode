const { Sequelize } = require('sequelize');

const sequelize = require('../conexion/database');

const Comments = sequelize.define('coments', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_producto: Sequelize.INTEGER,
  email: Sequelize.STRING,
  comment: Sequelize.STRING,
});

module.exports = Comments;
