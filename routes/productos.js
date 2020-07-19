const express = require('express');
const ProductosController = require('../Controllers/ProductosController');
const router = express.Router();

router.get('/', ProductosController.getProductos);

module.exports = router;
