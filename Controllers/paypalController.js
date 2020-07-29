'use strict'
var paypal = require('paypal-rest-sdk')
var Paypal = require("../models/paypal")
var Producto = require("../models/Productos")
var Sales = require("../models/Sales")
const { config } = require('../conexion/database')
const Productos = require('../models/Productos')


paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AcMKfRQSF9pEdf-R3NS8BPqEG03wqVx3lcbOfcjKDjlgGT7BHgrt7Wo9fG_AUwApnHvr2bfKPycOGncg',
    'client_secret': 'EOJs1WzHshExPGOi3EKf7CTNytIOrH3X9mCtQXCJZWsxsYoH1tSty6EIr8kd-foyz-NxP6X9l12sKOy6'
});

var productos = []

var controller = {


    pagar: function (req, res) {
        var p = "["+req.body.productos + "]".trim();
        p = p.replace(',]', ']');
        p = p.replace(' ', '');

        productos = JSON.parse(p);
        
        var total = 0;
        for(let i = 0;i <productos.length;i++){
            total += parseFloat(productos[i].price)
        }

        var json_paypal = {
            "intent": "sale",
            
            "redirect_urls": {
                "return_url": "http://localhost:4000/paypal/success",
                "cancel_url": "http://localhost:4000/paypal/return"
            },
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "item_list": {
                    "items": productos
                },
                "amount": {
                    "currency": "MXN",
                    "total": total
                },
                "description": "This is the payment description.",
                "custom": "c33ted6nndndk0q992t8l4pb7e#zbis9SEFSuf2DmghWx0PhA=="
            }]
        };
        paypal.payment.create(json_paypal, function (error, payment) {
            if (error) {
                // Helps.error(res, error)
                console.log("error");
            } else {
                var links = {};
                payment.links.forEach(function (linkObj) {
                    links[linkObj.rel] = {
                        'href': linkObj.href,
                        'method': linkObj.method
                    };
                })
                //if redirect url present, redirect user
                if (links.hasOwnProperty('approval_url')) {
                    res.redirect(links['approval_url'].href);
                } else {
                    console.error('no redirect URI present');
                }
                
            }
        });
    },
    success:  async function (req, res) {
        var paymentId = req.query.paymentId;
        var payerId = { 'payer_id': req.query.PayerID };
        paypal.payment.execute(paymentId, payerId, async function (error, payment) {
            if (error) {
                console.error(error);
            } else {
                //console.log(payment.transactions);
                if (payment.state == 'approved') {
                   
                    for(let i =0; i<productos.length;i++){
                        Sales.create({
                            id_producto: productos[i].sku,
                            cantidad: productos[i].quantity,
                        })
                        .then((result) => {
                            console.log(result);
                        })
                        .catch((err) => console.log(err));
                    }
                    var result = [];
            
                    for(var i in productos)
                        result.push( { "titulo" : productos[i].name,"id" : productos[i].sku   } );
            
                    return res.render('success', {
                        title: 'success',
                        libros: result,
                    });
                    
                    // res.send('payment completed successfully');
                } else {
                    res.send('payment not successful');
                }
            }
        });
    },

    descargar: function (req, res) {
        var id = req.params.id;
        Producto.findByPk(id)
        .then((manual) => {
            console.log(manual);
            var path = require('path');
            var appDir = path.dirname(require.main.filename);
            const file = appDir+`/public/images/`+manual.zip;
            res.download(file);
        })
        .catch((err) => console.log(err));
    },
}

module.exports = controller