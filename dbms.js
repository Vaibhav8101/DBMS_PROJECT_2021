const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");//for reading form data
const encoder = bodyParser.urlencoded();

const app = express();
app.use(express.static("HTML"));
// app.use("/HTML/img/", express.static("image"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/HTML/main.html");
})

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
    //inseting the data inside the form

});

app.post("/signup", encoder, function (req, res) {
    var rollno = req.body.rollno;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var branch = req.body.branch;
    var email = req.body.email;
    var phoneNo = req.body.phoneNo;
    var gender = req.body.gender;
    var year = req.body.year;
    var sem = req.body.sem;
    var username = req.body.username;
    var password = req.body.password;
    var pcheck = req.body.psw_repeat;
    if(pcheck===password){
    connection.query("insert into student(roll_no,fname,lname,branch,email,phone_no,gender,year,sem,username,password) values (?,?,?,?,?,?,?,?,?,?,?)", [rollno, fname, lname, branch, email, phoneNo, gender, year, sem, username, password], function (error, results, fields) {
        if (error) {
            console.log("Please Enter unique id and password");
            
        }
        else {
            console.log("Signup successfull");
        }
        // if (results.length > 0) {
        //     res.redirect("/insertsuccessfully");
        // } else {
        //     res.redirect("/insertsuccessfully");
        // }
        res.end();
    })
    }
    else
    {
        console.log("please enter the password again");
    }
})

//login code
app.post("/login", encoder, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from student where username = ? and password = ?", [username, password], function (error, results, fields) {
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/loginunsuccessfull");
        }
        res.end();
    })
})

app.get("/welcome", function (req, res) {
    res.sendFile(path.join(__dirname,"/HTML/welcome.html"))
})





app.listen(4001);
