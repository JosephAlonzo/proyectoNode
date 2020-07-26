const Productos = require('../models/Productos');
const Cart = require('../models/Cart');


exports.show = (req, res) => {
    Cart.findAll({
        where: {id_user: req.session.user[0].id}
    })
    .then((resultados) => {
        res.render('cart', {
        title: 'carrito',
        libros: resultados,
        });
    })
    .catch((err) => console.log(err));
}

exports.add = (req, res) => {
    var id = req.params.id;
    Productos.findByPk(id)
      .then((producto) => {
        Cart.create({
          id_producto: producto.id,
          id_user: req.session.user[0].id,
          titulo: producto.titulo,
          precio: producto.precio,
          autor: producto.autor,
          imagen: producto.imagen,
        })
      })
      .then((cart) => {
        res.redirect('/carrito');
      })
      .catch((err) => console.log(err));
};
  
exports.delete = (req, res) => {
    var id = req.params.id;
    Cart.findByPk(id)
        .then((cart) => {
        return cart.destroy(id);
    })
    .then((result) => {
        res.redirect('/carrito');
    })
    .catch((err) => console.log(err));
};
