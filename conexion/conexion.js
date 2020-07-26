
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'manualesproyecto'
});

connection.connect(
    (err)=>{
        if(!err){
            console.log("conexion OK");
        }
        else{
            console.log("Error conexion");
        }
    }
);
module.exports = connection;

// connection.query("SELECT * FROM productos", function(err, resultados){
//     console.log(resultados)
// });


//connection.end();

