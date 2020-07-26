'use strict'
var paypal = require('paypal-rest-sdk')
var Paypal = require("../models/paypal")
var Productos = require("../models/Productos")
var Sales = require("../models/Sales")

var productos = []

var controller = {
    pagar: function (req, res) {
        productos = [
            {
                "name": "item",
                "sku": 1,
                "price": "0.01",
                "currency": "MXN",
                "quantity": 1,
            },
            {
                "name": "item2",
                "sku": 2,
                "price": "0.01",
                "currency": "MXN",
                "quantity": 1
            }
        ]
        var total = 0;
        for(let i = 0;i <productos.length;i++){
            total += parseFloat(productos[i].price)
        }

        var json_paypal = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:4000/paypal/success",
                "cancel_url": "http://localhost:4000/paypal/return"
            },
            "transactions": [{
                "item_list": {
                    "items": productos
                },
                "amount": {
                    "currency": "MXN",
                    "total": total
                },
                "description": "This is the payment description."
            }]
        };
        paypal.payment.create(json_paypal, function (error, payment) {
            if (error) {
                // Helps.error(res, error)

            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    console.log(payment)
                    if (payment.links[i].rel === "approval_url") {
                        
                        res.redirect(payment.links[i].href)
                    }
                }
            }
        });
    },
    success: function (req, res) {
        // var paypal = new Paypal();
        // paypal.paymentId = req.query.paymentId
        // paypal.PayerID = req.query.PayerID
        // paypal.user ='5f0eb47db2f2f216d5bd36ae'
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
        return res.status(200).send({
            mensaje: "OK"
        })
        // paypal.save((err, stored)=>{
        //     if(stored){
        //         Paypal.find().populate("user").exec((err,isok)=>{
        //             return Helps.success(res,isok)
        //         })
        //     }else{
                
        //         return Helps.error(res, err)
        //     }
        // })
        
    }
}

module.exports = controller