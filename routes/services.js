const express = require("express");
const path = require("path")
const router = express.Router();
const Handlebars = require("express-handlebars")

const mysqlConnection = require("../connection");

express().use(express.static(path.join(__dirname, "../public")))


router.get("/bookdetails/:bookISBN", (req, res) => {
    isbn = req.params.bookISBN;
    mysqlConnection.query("Select * from books where isbn = " + String(isbn), (err, rows, fields) => {
        if (!err) {
            if(rows[0]['category'] == 'E'){
                rows[0]['category'] = "Exchange Book"
            }else if(rows[0]['category'] == 'B'){
                rows[0]['category'] = "Buy Book"
            }else if(rows[0]['category'] == 'L'){
                rows[0]['category'] = "Lend Book"
            }
            // console.log(rows);
            res.render("book_details", { rows: rows, layout: 'main.handlebars'})
        } else {
            // res.send(err);
            console.log(err);
            return;
        }
    })
})

router.get("/exchange", (req, res) => {
    mysqlConnection.query("Select * from books where category = 'E'", (err, rows, fields) => {
        if (!err) {
            // console.log(rows);
            res.render("books", { rows: rows, layout: 'ListBook.handlebars' })
            // console
        } else {
            // res.send(err);
            console.log(err);
            return;
        }
    })
})

//sellbook
router.get("/sell", (req, res) => {
    mysqlConnection.query("Select * from books where category = 'S'", (err, rows, fields) => {
        if (!err) {
            // console.log(rows);
            res.render("books", { rows: rows, layout: 'ListBook.handlebars' })
            // console.log(rows)
        } else {
            // res.send(err);
            console.log(err);
            return;
        }
    })
})

//rentbook
router.get("/rent", (req, res) => {
    mysqlConnection.query("Select * from books where category = 'R'", (err, rows, fields) => {
        if (!err) {
            // console.log(rows);
            res.render("books", { rows: rows, layout: 'ListBook.handlebars' })
        } else {
            // res.send(err);
            console.log(err);
            return;
        }
    })
})


//buybook
router.get("/buy", (req, res) => {
    mysqlConnection.query("Select * from books where category = 'B'", (err, rows, fields) => {
        if (!err) {
            // console.log(rows);
            res.render("books", { rows: rows, layout: 'ListBook.handlebars' })
        } else {
            // res.send(err);
            console.log(err);
            return;
        }
    })
})

module.exports = router