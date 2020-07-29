var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var paypal = require("paypal-rest-sdk")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productosRouter = require('./routes/productos');
var adminRouter = require('./routes/admin');
var paypalRouter = require('./routes/paypal');
var cartRouter = require('./routes/cart');
var commentRouter = require('./routes/comments');



// Databases
const sequelize = require('./conexion/database');

var app = express();

app.use(session({
  name: 'sid',
  resave :true,
  secret:"secret",
  saveUninitialized: true,
  cookie: { 
    maxAge: 6000000,
    secure: false
  }
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productos', productosRouter);
app.use('/admin', adminRouter);
app.use('/paypal', paypalRouter);
app.use('/carrito', cartRouter);
app.use('/comments', commentRouter);




// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

//TODO inicializar paypal
// paypal.configure({
//   'mode': 'sandbox',
//   'client_id': 'AcMKfRQSF9pEdf-R3NS8BPqEG03wqVx3lcbOfcjKDjlgGT7BHgrt7Wo9fG_AUwApnHvr2bfKPycOGncg',
//   'client_secret': 'EOJs1WzHshExPGOi3EKf7CTNytIOrH3X9mCtQXCJZWsxsYoH1tSty6EIr8kd-foyz-NxP6X9l12sKOy6'
// });



sequelize
  .sync()
  .then((res) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



module.exports = app;
