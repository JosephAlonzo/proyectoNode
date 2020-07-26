const Sales = require('../models/Sales');
const ventas_producto = require('../models/Ventas_producto');
const ventas_producto_completo = require('../models/Ventas_producto_completo');

exports.getSales = (req, res) => {
    ventas_producto.findAll()
    .then((Ventas_producto) => {
        res.render('adminSales', {
            title: 'Ventas',
            Sales: Ventas_producto,
        });
    })
    .catch((err) => console.log(err));
};

exports.getSalesDate = (req, res) => {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    if(date1 == '' || date2 == ''){
        res.redirect('/admin/ventas');
    }
    const { Op } = require("sequelize");
    ventas_producto_completo.findAll({
        where:{ 
            createdAt: {
                [Op.gt]: new Date(date1),
                [Op.lt]: new Date(date2)
            }
        }
    })
    .then((Ventas_producto) => {
        res.render('adminSales', {
            title: 'Ventas',
            Sales: Ventas_producto,
        });
    })
    .catch((err) => 
    console.log(err));
};


exports.addSales = (req, res) => {
    var id_producto = req.body.id_producto;
    var cantidad = req.body.cantidad;
    Sales.create({
        id_producto: id_producto,
        cantidad: cantidad
    })
    .then((result) => {
        res.redirect('/admin/ventas');
    })
    .catch((err) => console.log(err));
};

exports.updateSales = (req, res) => {
    var id = req.body.id;
    var id_producto = req.body.id_producto;
    var cantidad = req.body.cantidad;

    Sales.findByPk(id)
        .then((sale) => {
            id_producto.id_producto = id_producto,
            cantidad.cantidad = cantidad
            return sale.save();
        })
        .then((reponse) => {
            res.redirect('/admin/ventas');
        })
        .catch((err) => console.log(err));
};



exports.deleteSales = (req, res) => {
    var id = req.body.id;

    Sales.findByPk(id)
        .then((sale) => {
            return sale.destroy(id);
        })
        .then((result) => {
            res.redirect('/admin/ventas');
        })
        .catch((err) => console.log(err));
};
