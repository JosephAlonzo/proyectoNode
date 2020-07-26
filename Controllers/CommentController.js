const Productos = require('../models/Productos');
const Comments = require('../models/Comments');


exports.show = (req, res) => {
    var id = req.params.id;
    Productos.findByPk(id)
      .then((libro) => {
            Comments.findAll({
                where: {
                    id_producto: id,
                }, 
            })
            .then((comments) => {
                    res.render('productoComment', {
                        title: 'Productos',
                        libro: libro,
                        comments: comments,
                    });
                })
        })
        .catch((err) => console.log(err));
  };

  exports.add = (req, res) => {
    var id = req.body.id;
    var comment = req.body.comment;
    var email = req.body.email;

    Comments.create({
        id_producto: id,
        email: email,
        comment: comment,
      })
      .then((result) => {
        res.redirect('/comments/show/'+id);
      })
      .catch((err) => console.log(err));
    
  };