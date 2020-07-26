const { Sequelize } = require('sequelize');

const sequelize = require('../conexion/database');

const Paypal = sequelize.define('paypal', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    payerId: Sequelize.INTEGER,
    date: Sequelize.DATE,
    userId: Sequelize.INTEGER,
    manualId: Sequelize.INTEGER,
  });
  
  module.exports = Paypal;
// var paypalSchema = schema({
//     paymentId: String,
//     PayerID:String,
//     date:{type:Date, default:Date.now},
//     user:{type:schema.ObjectId,ref:'User'},
//     manuales:[{type:schema.ObjectId,ref:'Manual'}]
// })

// module.exports = mongoose.model('Paypal', paypalSchema)