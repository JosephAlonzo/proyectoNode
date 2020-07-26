var express = require('express');
const Productos = require('../models/Productos');
var router = express.Router();

const redirectLogin = (req, res, next) =>{
  if(!req.session.user){
      res.redirect('/login');
  }
  else if(req.session.user[0].tipo == 0){
      res.redirect('/');
  }
  else{
      next();
  }
}

/* GET home page. */
router.get('/', redirectLogin, function(req, res, next) {
  Productos.findAll()
    .then((resultados) => {
      res.render('cart', {
        title: 'carrito',
        libros: resultados,
      });
    })
    .catch((err) => console.log(err));
});


module.exports = router;
