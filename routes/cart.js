var express = require('express');
var router = express.Router();
const CartController = require('../Controllers/CartController');

const redirectLogin = (req, res, next) =>{
  if(!req.session.user){
      res.redirect('/login');
  }
  else{
      next();
  }
}

/* GET home page. */
router.get('/', redirectLogin, CartController.show);

router.get('/add/:id', redirectLogin, CartController.add);
router.get('/delete/:id',redirectLogin, CartController.delete);

module.exports = router;
