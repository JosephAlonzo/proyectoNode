var express = require('express');
var router = express.Router();
const ProductosController = require('../Controllers/ProductosController');
const UserController = require('../Controllers/UserController');
const SalesController = require('../Controllers/SalesController');
var multipart = require("connect-multiparty")
var md_ = multipart({uploadDir:'./public/images'})

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

router.post('/login', UserController.login);

router.get('/',redirectLogin, ProductosController.getAdminProductos);
router.get('/productos',redirectLogin, ProductosController.getAdminProductos);
router.post('/productos/findByName', ProductosController.findProductosByName);
router.post('/add-productos',md_, ProductosController.addProductos);
router.post('/update-productos',md_, ProductosController.updateProductos);
router.post('/delete-productos', ProductosController.deleteProductos);

router.get('/usuarios',redirectLogin, UserController.getUsers);
router.post('/add-users', UserController.addUsers);
router.post('/update-users', UserController.updateUsers);
router.post('/delete-users', UserController.deleteUsers);

router.get('/ventas',redirectLogin, SalesController.getSales);
router.post('/ventas', SalesController.getSalesDate);
router.post('/add-sales', SalesController.addSales);
router.post('/update-sales', SalesController.updateSales);
router.post('/delete-sales', SalesController.deleteSales);


module.exports = router;
