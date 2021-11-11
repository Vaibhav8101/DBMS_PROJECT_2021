const express = require("express");
const path = require("path")
const router = express.Router();

const mysqlConnection = require("../connection");
const router2 = require("./bookupload");

express().use(express.static(path.join(__dirname, "../public")))


router.get("/bookdetails/:bookISBN", (req, res) => {
    isbn = req.params.bookISBN;
    mysqlConnection.query("Select * from books where isbn = " + String(isbn), (err, rows, fields) => {
        if (!err) {
            if (rows[0]['category'] == 'E') {
                rows[0]['category'] = "Exchange Book"
                mysqlConnection.query("select * from demand where isbn = ?", [isbn], (error, result, field) => {
                    if (!error) {
                        rows[0]['D_Book'] = result[0]['btitle'];
                        rows[0]['D_Author'] = result[0]['bauthor'];
                    }
                })
            } else if (rows[0]['category'] == 'S') {
                rows[0]['category'] = "Buy Book"
                mysqlConnection.query("select * from sell where isbn = ?", [isbn], (error, result, fld) => {
                    if (!error) rows[0]['price'] = result[0]['price'];
                })
            } else if (rows[0]['category'] == 'R') {
                rows[0]['category'] = "Rent Book"
                mysqlConnection.query("select * from rent where isbn = ?", [isbn], (error, result, fld) => {
                    if (!error) rows[0]['cost'] = result[0]['cost'];
                })
            }
            // console.log(rows);
            res.render("book_details", { rows: rows, layout: 'main.handlebars' })
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
            rows['category'] = 'E';
            rows['Name'] = "Exchange"
            // res.render("books", { rows: rows, layout: 'ListBook.handlebars' })
            var cG=rows['category'];
            // res.render("books", { rows: rows,category:cG, layout: 'ListBook.handlebars' })
            var cG=rows['category'];
            res.render("books", { rows: rows,category:cG, layout: 'ListBook.handlebars' })
            // console
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
            rows['category'] = 'R';
            rows['Name'] = "Rent"
            var cG=rows['category'];
            // res.render("books", { rows: rows,category:cG, layout: 'ListBook.handlebars' })
            var cG=rows['category'];
            res.render("books", { rows: rows,category:cG, layout: 'ListBook.handlebars' })
        } else {
            // res.send(err);
            console.log(err);
            return;
        }
    })
})


//buybook
router.get("/buy", (req, res) => {
    mysqlConnection.query("Select * from books where category = 'S'", (err, rows, fields) => {
        if (!err) {
            // console.log(rows);
            rows['category'] = 'S';
            rows['Name'] = "Sell"
            // res.render("books", { rows: rows, layout: 'ListBook.handlebars' })
            var cG=rows['category'];
            res.render("books", { rows: rows,category:cG, layout: 'ListBook.handlebars' })
        } else {
            // res.send(err);
            console.log(err);
            return;
        }
    })
})

module.exports = router