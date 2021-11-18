const express = require("express");
const path = require("path")
const router3 = express.Router();

const connection = require("../connection");
const router2 = require("./bookupload");

express().use(express.static(path.join(__dirname, "../public")))

router3.get("/action/:C/:isbn/:owner", (req, res) => {
    console.log("dsds");
    char = req.params.C;
    isbn = req.params.isbn;
    owner = req.params.owner;
    if(char == 'ED'){
        res.redirect("/bookupload/"+char+"/"+req.params.isbn+"/"+req.params.owner);
    }else if(char == "R"){
        console.log(req.session.Username);
        if(req.session.Username){
            connection.query("select roll_no from student where username = ?",[req.session.Username], (err, rows, fields) => {
                if(!err){
                    console.log(rows[0]["roll_no"]);
                    roll_no = rows[0]["roll_no"];
                    connection.query("insert into borrow_books(rollno, owner, isbn, startdate) values(?,?,?, CURDATE())",[roll_no, owner, isbn], (err, rows, fields) => {
                        if(err){
                            console.log(err);
                        }else {
                            connection.query("update books set category = 'BR' where isbn = ?",[isbn]);
                            res.send("Lended successfully. You can collect the book from the store.");
                        }
                    });
                }
            })

        }else{
            res.redirect("/login");
        }
    } else if(char == "S"){
        if(req.session.Username){
            connection.query("select roll_no from student where username = ?",[req.session.Username], (err, rows, fields) => {
                roll_no = rows[0]['roll_no'];
                connection.query("insert into buybook (rollno, isbn, owner) values (?,?,?)",[roll_no, isbn, owner], (err, rows, fields) => {
                    if(!err){
                        connection.query("update books set category = 'SD' where isbn = ?", [isbn]);
                        res.send("You can collect your book from the store.");
                    }else{
                        res.send("Try again after some time.");
                    }

                });
            });
        }else {
            res.redirect('/login')
        }
    }
});

module.exports = router3;

