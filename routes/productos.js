const express = require('express');

const ProductosController = require('../Controllers/ProductosController');

const router = express.Router();

router.get('/', ProductosController.getProductos);
router.post('/agregar-productos', ProductosController.postProductos);
router.post('/update-productos', ProductosController.updateProductos);
router.post('/delete-productos', ProductosController.deleteProductos);

module.exports = router;
