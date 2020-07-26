var express = require('express');
var router = express.Router();
const ventas_producto = require('../models/Ventas_producto');


/* GET home page. */
router.get('/', function(req, res, next) {
  ventas_producto.findAll({
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ['cantidad', 'DESC'],
      ]
    })
    .then((Ventas_producto) => {
        res.render('index', {
            title: 'Bienvenido',
            libros: Ventas_producto,
        });
    })
    .catch((err) => console.log(err));
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/acercade', function(req, res, next) {
  res.render('acercade', { title: 'Acerca de nosotros' });
});


module.exports = router;
