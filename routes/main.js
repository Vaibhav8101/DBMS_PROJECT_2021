const connection = require("../connection");
const express = require("express");
const path = require("path");
const router = require("./services");
const router1 = express.Router()
const bodyParser = require("body-parser");//for reading form data
const encoder = bodyParser.urlencoded();


router1.post("/signup", encoder, function (req, res) {
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
            res.redirect('login.html')
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
router1.post("/login", encoder, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from student where username = ? and password = ?", [username, password], function (error, results, fields) {
        if (results.length > 0) {
            console.log("Login successful");
            res.redirect("service.html");
        } else {
            res.redirect("/loginunsuccessfull");
        }
        res.end();
    })
})

router1.get("/",  (req, res) => {
    res.sendFile(path.join(__dirname ,"../public/html/main.html"));
  })

module.exports = router1;

