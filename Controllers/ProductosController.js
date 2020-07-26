const Productos = require('../models/Productos');
var fs = require("fs")
var path = require("path")

uploadImage = (req,res) => {
  console.log(req.files.foto);
  if (req.files.foto) {
    if(req.files.foto.name == ""){
      fs.unlink(filePath, (err, delte)=>{
        return null;
      })
      }
    }
    var allow =["png","jpg","jpeg"]
    var filePath = req.files.foto.path;
    var fileSplit = filePath.split('\\');
    var fileName = fileSplit[2]
    var extSplit = fileName.split("\.")
    var fileExt = extSplit[1].toLowerCase();
    if(allow.includes(fileExt)){
      return fileName;
    }else{
        fs.unlink(filePath, (err, delte)=>{
            return res.status(200).send({
                apiNotFound: "Extensión no valida"
            })
        })
    }
}
deleteFile = (pathLastFile)=> {
  if(pathLastFile != null){
    fs.unlink(pathLastFile, (err, delte)=>{
      return "success";
    })
  }
  
}
uploadZip = (req,res) => {
  console.log(req.files);
  if (req.files.zip) {
    if(req.files.zip.name == ""){
      fs.unlink(filePath, (err, delte)=>{
        return null;
      })
      }
    }
    var allow =["zip", "rar"]
    var filePath = req.files.zip.path;
    var fileSplit = filePath.split('\\');
    var fileName = fileSplit[2]
    var extSplit = fileName.split("\.")
    var fileExt = extSplit[1].toLowerCase();
    if(allow.includes(fileExt)){
      return fileName;
    }else{
        fs.unlink(filePath, (err, delte)=>{
            return res.status(200).send({
                apiNotFound: "Extensión no valida"
            })
        })
    }
}




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

exports.findProductosByName = (req, res) => {
  var name = req.body.name;

  const { Op } = require("sequelize");
  Productos.findAll({
    where: { 
        titulo: {
          [Op.like]: '%'+name+'%'
        }
      }
    })
    .then((resultados) => {
      res.render('adminProducts', {
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
  var activo = req.body.activo;
  var fileName =  uploadImage(req, res);
  var fileZipName =  uploadZip(req, res);

  Productos.create({
    titulo: title,
    descripcion: descripcion,
    precio: precio,
    imagen: fileName,
    autor: autor,
    tecnologia: tecnologia,
    activo: activo,
    zip: fileZipName,

  })
  .then((result) => {
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
  var activo = req.body.activo;
  var fileName = null;
  var fileZipName = null;
  if(req.files.foto.size > 0){
    var fileName =  uploadImage(req, res);
  }
  if(req.files.zip.size > 0){
    var fileZipName =  uploadZip(req, res);
  }

  Productos.findByPk(id)
    .then((producto) => {
      producto.id = id,
      producto.titulo= title,
      producto.descripcion= descripcion,
      producto.precio= precio,
      producto.autor= autor,
      producto.tecnologia= tecnologia,
      producto.activo= activo
      return producto.save();
    })
    .then((producto) => {
      if(fileName){
        console.log("imagen");
        console.log(fileName);
        deleteFile( "public\\images\\"+producto.imagen )
        producto.imagen= fileName
      }
      return producto.save();
    })
    .then((producto) => {
      if(fileZipName){
        deleteFile( "public\\images\\"+producto.zip )
        producto.zip= fileZipName
      }
      return producto.save();
    })
    .then((result) => {
      res.redirect('/admin/productos');
    })
    .catch((err) => console.log(err));
  
};



exports.deleteProductos = (req, res) => {
  var id = req.body.id;

  Productos.findByPk(id)
    .then((producto) => {
      deleteFile( "public\\images\\" +producto.imagen )
      deleteFile( "public\\images\\" +producto.zip )
      return producto.destroy(id);
    })
    .then((result) => {
      res.redirect('/admin/productos');
    })
    .catch((err) => console.log(err));
};
