'use strict'
var express = require('express')
var paypal = require('../controllers/paypalController')

var router = express.Router()

router.post("/pagar", paypal.pagar)
router.get("/success", paypal.success)
router.get("/descargar/:id", paypal.descargar)

module.exports = router