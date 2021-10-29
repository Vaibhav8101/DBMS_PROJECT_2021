const mysql = require("mysql");

var host = "sql6.freesqldatabase.com";
var user = "sql6447609";
var pass = "GDlm6fL6Uc";
var database = "sql6447609";

var mysqlConnection = mysql.createConnection( {
    host: host,
    user: user,
    password: pass,
    database: database,
    multipleStatements: true
})
mysqlConnection.connect((err) => {
    if(!err){ 
        console.log("Connected")
    }else{
        console.log("Connection Failed");
    }
})

module.exports = mysqlConnection