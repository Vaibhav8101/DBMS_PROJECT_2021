const mysql = require("mysql");

var host = "remotemysql.com";
var user = "nsYyfn2jmb";
var pass = "erarzfZVZG";
var database = "nsYyfn2jmb";

//creating a pool because err come with mysqlConnection
var mysqlConnection = mysql.createPool({
    host: host,
    user: user,
    password: pass,
    database: database,
    connectionLimit : 10,
    multipleStatements: true
})

module.exports = mysqlConnection