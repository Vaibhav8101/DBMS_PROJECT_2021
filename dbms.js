const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");//for reading form data
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/styling", express.static("styling"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3307,
    database: "login"

});

connection.connect(function (error) {
    if (error) throw error
    else console.log("connected to the database successfully!")
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("show databases", function (err, result) {
        // console.log(result);
        var flag = 1;
        for (const key in result) {
            if (result[key].Database === 'login') {
                flag = 0;
            }
            // console.log(result[key].Database);
        }
        // console.log(flag);
        if (flag != 0) {
            connection.query("CREATE DATABASE Login", function (err, result) {
                if (err) throw err;
                console.log("Database created");
            });

        }
    });

    connection.query("show tables", function (err, result) {
        var flag2 = 1;
        if (err) throw err;
        for (const key in result) {
            if (result[key].Tables_in_login === 'student') {
                flag2 = 0;
            }
            // console.log(result[key].Tables_in_login);
        }
        // console.log(flag2);

        var sql = "create table student(roll_no int not null,fname varchar(30) not null,lname varchar(30),branch varchar(25),email varchar(29),phone_no bigint not null,gender char not null,year varchar(30),sem varchar(15),rating int,username varchar(30) not null,password varchar(30) not null,primary key(username,roll_no))";
        if (flag2 != 0) {

            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table created");
            });
        }
    });
});
