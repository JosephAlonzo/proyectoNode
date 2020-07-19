const Productos = require('../models/Productos');

exports.getProductos = (req, res) => {
  Productos.findAll()
    .then((resultados) => {
      res.render('productos', {
        title: 'Productos',
        libros: resultados,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAdminProductos = (req, res) => {
  Productos.findAll()
    .then((resultados) => {
      res.render('adminProducts', {
        title: 'Productos',
        libros: resultados,
      });
    })
    .catch((err) => console.log(err));
};

exports.addProductos = (req, res) => {
  var title = req.body.titulo;
  var autor = req.body.autor;
  var descripcion = req.body.descripcion;
  var precio = req.body.precio;
  var tecnologia = req.body.tecnologia;
  var imagen = req.body.foto;

  Productos.create({
    titulo: title,
    descripcion: descripcion,
    precio: precio,
    imagen: imagen,
    autor: autor,
    tecnologia: tecnologia,
  })
    .then((result) => {
      console.log(result);
      res.redirect('/admin/productos');
    })
    .catch((err) => console.log(err));
};

exports.updateProductos = (req, res) => {
  var id = req.body.id;
  var title = req.body.titulo;
  var autor = req.body.autor;
  var descripcion = req.body.descripcion;
  var precio = req.body.precio;
  var tecnologia = req.body.tecnologia;
  var imagen = req.body.foto;

  Productos.findByPk(id)
    .then((producto) => {
      producto.id = id,
      producto.titulo= title,
      producto.descripcion= descripcion,
      producto.precio= precio,
      producto.imagen= imagen,
      producto.autor= autor,
      producto.tecnologia= tecnologia
      return producto.save();
    })
    .then((reponse) => {
      res.redirect('/admin');
    })
    .catch((err) => console.log(err));
};



exports.deleteProductos = (req, res) => {
  var id = req.body.id;

  Productos.destr({
    id: id,
  })
    .then((result) => {
      console.log(result);
      res.redirect('/admin/productos');
    })
    .catch((err) => console.log(err));
};
