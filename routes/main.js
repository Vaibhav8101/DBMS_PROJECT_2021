var connection = require("../connection");
const express = require("express");
const path = require("path");
const bcrypt = require('bcryptjs');
const router = require("./services");
const dbService = require('./dbservices');
const router1 = express.Router()
const Handlebars = require("express-handlebars");
const bodyParser = require("body-parser");//for reading form data
const mysqlConnection = require("../connection");
const encoder = bodyParser.urlencoded();
express().use(express.static(path.join(__dirname, "../public")));
var sessionUsername,category,searchValue;


//signup request
router1.post("/signup", encoder, async function (req, res) {
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
    if (pcheck === password) {
        const hashpsw = await bcrypt.hash(password, 6);
        connection.query("insert into student(roll_no,fname,lname,branch,email,phone_no,gender,year,sem,username,password) values (?,?,?,?,?,?,?,?,?,?,?)", [rollno, fname, lname, branch, email, phoneNo, gender, year, sem, username, hashpsw], function (error, results, fields) {
            if (error) {
                throw error;
            }
            else {
                console.log("Signup successfull");
                res.redirect("/login")
            }
            res.end();
        })
    }
    else {
        console.log("Please enter the password again");
        res.redirect("/login");

    }
})

//home page
router1.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/main.html"))
})

//login code
router1.post("/login", encoder, async function (req, res) {
    username = req.body.username;
    var password = req.body.password;
    connection.query("select password from student where username = ? ", [username], async function (error, results, fields) {
        results = JSON.parse(JSON.stringify(results))
        // console.log(results[0].password);
        if (await bcrypt.compare(password, results[0].password)) {
            console.log("Login successful");
            req.session.Username = username;
            sessionUsername = req.session.Username;
            // console.log(req.session.Username);
            res.redirect("/service");
        } else {
        }
        res.end();
    })
})

//giving data to the signup form js so we analyse this username exist or not
router1.get("/getAll", function (req, res) {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));

})

//services page
router1.get("/service", function (req, res) {
    // console.log(req.session.Username);
    if (req.session.Username) {
        res.render("service", { name: req.session.Username, layout: "services" });
    }
    else {
        res.redirect("/login");
    }
})

//logout request
router1.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            res.redirect("/login");
        }
    })
    res.redirect("/login");
})


//user profile
router1.get("/profile", (req, res) => {
    connection.query("select roll_no,username,fname,lname,branch,email,phone_no,gender,year,sem,rating  from student where username = ?", [sessionUsername], (error, results, fields) => {
        if (!error) {
            results = JSON.parse(JSON.stringify(results))
            res.render("userDash", { results: results, layout: "mainUserDash.handlebars" });

        } else {
            res.redirect("/login");
        }

    })
})

//logint page redirection
router1.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/login.html"))
})


//search bar
router1.post("/search/:category", encoder, async function (req, res){
    searchValue=req.body.search;
    category = req.params.category;
    console.log(category);
    console.log(searchValue);
    res.redirect("/search");
})
router1.get("/search", function (req, res) {
    // res.sendFile(path.join(__dirname, "../public/html/login.html"))
    mysqlConnection.query("Select * from books where category = ? and title like ?",[category,'%'+searchValue+'%'], (err, rows, fields) => {
        if (!err) {
            rows['category'] = 'R';
            rows['Name'] = "Rent"
            var cG=rows['category'];
            res.render("books", { rows: rows,category:cG, layout: 'ListBook.handlebars' })
        } else {
            // res.send(err);
            console.log(err);
            return;
        }
    })
})

module.exports = router1;

