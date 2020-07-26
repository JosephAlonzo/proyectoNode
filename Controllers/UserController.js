const Users = require('../models/Users');

exports.getUsers = (req, res) => {
    Users.findAll()
    .then((resultados) => {
        console.log(resultados);
        res.render('adminUsers', {
            title: 'Usuarios',
            users: resultados,
        });
    })
    .catch((err) => console.log(err));
};

exports.addUsers = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var tipo = req.body.tipo;
    
    Users.create({
        email: email,
        password: password,
        tipo: tipo
    })
    .then((result) => {
        console.log(result);
        res.redirect('/admin/usuarios');
    })
    .catch((err) => console.log(err));
};

exports.updateUsers = (req, res) => {
    var id = req.body.id;
    var email = req.body.email;
    var password = req.body.password;
    var tipo = req.body.tipo;

    Users.findByPk(id)
        .then((user) => {
            user.id = id,
            user.email = email,
            user.password = password,
            user.tipo = tipo
            return user.save();
        })
        .then((reponse) => {
            res.redirect('/admin/usuarios');
        })
        .catch((err) => console.log(err));
};



exports.deleteUsers = (req, res) => {
    var id = req.body.id;

    Users.findByPk(id)
        .then((user) => {
            return user.destroy(id);
        })
        .then((result) => {
            res.redirect('/admin/usuarios');
        })
        .catch((err) => console.log(err));
};


exports.login = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
        
    Users.findAll({
        where: {email: email}
    })
    .then((user) => {
        if(!user){
            res.redirect('/login');
        }
        else if(user[0].password == password){
            req.session.user = user;
            // console.log("*----------------------------------- Inicico debud --------------------------------------------------*");
            // console.log("*----------------------------------- Inicico debud --------------------------------------------------*");
            // console.log("*----------------------------------- Inicico debud --------------------------------------------------*");
            // console.log("*----------------------------------- Inicico debud --------------------------------------------------*");
            // req.session.user = user;
            // console.log("Estoy imprimiendo mi usuario");
            // console.log(req.session.user);
            // console.log("*----------------------------------- Fin debud --------------------------------------------------*");
            // console.log("*----------------------------------- Fin debud --------------------------------------------------*");
            // console.log("*----------------------------------- Fin debud --------------------------------------------------*");
            // console.log("*----------------------------------- Fin debud --------------------------------------------------*");
            res.redirect('/admin/productos');
        }
        else{
            res.redirect('/login');
        }
    })
    .catch((err) => console.log(err));
};
