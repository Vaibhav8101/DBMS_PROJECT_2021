const mysql = require("mysql");

var host = "remotemysql.com";
var user = "nsYyfn2jmb";
var pass = "erarzfZVZG";
var database = "nsYyfn2jmb";

// var host = "db4free.net";
// var user = "abcdefghi";
// var pass = "password";
// var database = "bookexchange";

//creating a pool because err come with mysqlConnection
var mysqlConnection = mysql.createPool({
    host: host,
    user: user,
    password: pass,
    database: database,
    multipleStatements: true
})

module.exports = mysqlConnection