'use strict'
var express = require('express')
var paypal = require('../controllers/paypalController')

var router = express.Router()

router.get("/pagar", paypal.pagar)
router.get("/success", paypal.success)

module.exports = router