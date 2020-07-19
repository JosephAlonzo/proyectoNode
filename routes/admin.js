var express = require('express');
var router = express.Router();
var db=require("../conexion/conexion");

/* GET home page. */
router.get('/', function(req, res, next) {
    db.query("SELECT * FROM productos", function(err, resultados){
        console.log(resultados);
        res.render('adminProducts', { title: 'Productos', libros: resultados });
    });
});

router.get('/productos', function(req, res, next) {
    db.query("SELECT * FROM productos", function(err, resultados){
        console.log(resultados);
        res.render('adminProducts', { title: 'Productos', libros: resultados });
    });
});

router.get('/usuarios', function(req, res, next) {
    db.query("SELECT * FROM users", function(err, resultados){
        console.log(resultados);
        res.render('adminUsers', { title: 'Usuarios', users: resultados });
    });
});

router.get('/ventas', function(req, res, next) {
    db.query("SELECT * FROM ventas", function(err, resultados){
        console.log(resultados);
        res.render('adminBuys', { title: 'Ventas', buys: resultados });
    });
});
  

module.exports = router;
