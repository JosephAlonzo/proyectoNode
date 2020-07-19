var express = require('express');
var router = express.Router();
const ProductosController = require('../Controllers/ProductosController');
// var db = require('../conexion/conexion');

// /* GET home page. */
// router.get('/', function (req, res, next) {
//   db.query('SELECT * FROM productos', function (err, resultados) {
//     console.log(resultados);
//     res.render('adminProducts', { title: 'Productos', libros: resultados });
//   });
// });

// router.get('/productos', function (req, res, next) {
//   db.query('SELECT * FROM productos', function (err, resultados) {
//     console.log(resultados);
//     res.render('adminProducts', { title: 'Productos', libros: resultados });
//   });
// });

// router.get('/usuarios', function (req, res, next) {
//   db.query('SELECT * FROM users', function (err, resultados) {
//     console.log(resultados);
//     res.render('adminUsers', { title: 'Usuarios', users: resultados });
//   });
// });

// router.get('/ventas', function (req, res, next) {
//   db.query('SELECT * FROM ventas', function (err, resultados) {
//     console.log(resultados);
//     res.render('adminBuys', { title: 'Ventas', buys: resultados });
//   });
// });

router.get('/', ProductosController.getAdminProductos);
router.get('/productos', ProductosController.getAdminProductos);
router.post('/add-productos', ProductosController.addProductos);
router.post('/update-productos', ProductosController.updateProductos);
router.post('/delete-productos', ProductosController.deleteProductos);

router.get('/users', ProductosController.getUsers);
router.post('/add-users', ProductosController.addUsers);
router.post('/update-users', ProductosController.updateUsers);
router.post('/delete-users', ProductosController.deleteUsers);

router.get('/buys', ProductosController.getBuys);
router.post('/add-buys', ProductosController.addBuys);
router.post('/update-buys', ProductosController.updateBuys);
router.post('/delete-buys', ProductosController.deleteBuys);


module.exports = router;
