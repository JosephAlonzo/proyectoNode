// const Sales = require('../models/Sales');
// var fs = require("fs")

// exports.getSales = (req, res) => {
//   Sales.findAll()
//     .then((resultados) => {
//       res.render('adminSales', {
//         title: 'Ventas',
//         libros: resultados,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.getAdminSales = (req, res) => {
//   Sales.findAll()
//     .then((resultados) => {
//       res.render('adminSales', {
//         title: 'Ventas',
//         libros: resultados,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.addSales = (req, res) => {
//   var title = req.body.titulo;
//   var autor = req.body.autor;
//   var descripcion = req.body.descripcion;
//   var precio = req.body.precio;
//   var tecnologia = req.body.tecnologia;
//   var fileName =  uploadImage(req, res);

//   Sales.create({
//     titulo: title,
//     descripcion: descripcion,
//     precio: precio,
//     imagen: fileName,
//     autor: autor,
//     tecnologia: tecnologia,
//   })
//   .then((result) => {
//     res.redirect('/admin/Sales');
//   })
//   .catch((err) => console.log(err));

// };

// exports.updateSales = (req, res) => {
//   var id = req.body.id;
//   var title = req.body.titulo;
//   var autor = req.body.autor;
//   var descripcion = req.body.descripcion;
//   var precio = req.body.precio;
//   var tecnologia = req.body.tecnologia;
//   var fileName =  uploadImage(req, res);

//   if(fileName){
//     Sales.findByPk(id)
//       .then((producto) => {
//         deleteImage( "public\\images\\" +producto.imagen )
//         producto.id = id,
//         producto.titulo= title,
//         producto.descripcion= descripcion,
//         producto.precio= precio,
//         producto.imagen= fileName,
//         producto.autor= autor,
//         producto.tecnologia= tecnologia
//         return producto.save();
//       })
//       .then((reponse) => {
//         res.redirect('/admin');
//       })
//       .catch((err) => console.log(err));
//   }
//   else{
//     Sales.findByPk(id)
//       .then((producto) => {
//         producto.id = id,
//         producto.titulo= title,
//         producto.descripcion= descripcion,
//         producto.precio= precio,
//         producto.autor= autor,
//         producto.tecnologia= tecnologia
//         return producto.save();
//       })
//       .then((reponse) => {
//         res.redirect('/admin');
//       })
//       .catch((err) => console.log(err));
//   }
// };



// exports.deleteSales = (req, res) => {
//   var id = req.body.id;

//   Sales.findByPk(id)
//     .then((producto) => {
//       deleteImage( "public\\images\\" +producto.imagen )
//       return producto.destroy(id);
//     })
//     .then((result) => {
//       res.redirect('/admin/Sales');
//     })
//     .catch((err) => console.log(err));
// };
