const connection = require("../connection");
const express = require("express");
const router2 = express.Router();
const path = require("path");

const fileupload = require('express-fileupload');

const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

express().use(express.static(path.join(__dirname, "../public")))
express().use(fileupload());

router2.get("/bookupload/:C", (req, res) => {
    char = req.params.C
    category = {
        E: char == 'E',
        S: char == 'S',
        R: char == 'R',
        par: char
    }
    console.log(category);
    res.render("bookupload", { category, layout: "bookuploadmain" });
})

router2.post("/uploadbook/:C", encoder, (req, res) => {
    console.log(req.files.samplefile)
    request = req.params.C;
    console.log(request);
    title = req.body.title;
    author = req.body.author;
    year = req.body.year;
    isbn = req.body.isbn;
    semester = req.body.semester;
    edition = req.body.edition;
    language = req.body.language;
    owner = req.body.owner;
    book_category = req.body.book_category;
    publisher = req.body.publisher;
    highlight = req.body.highlight;
    description = req.body.description;
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    image = 1;
    console.log(sampleFile);
    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/img/' + String(isbn) +".jpg";

    console.log(sampleFile);

    // Use mv() to place file on the server
    console.log(req.session.Username);
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        console.log(req.session.Username);
    });
    
    console.log(req.body);
    // res.get(req.url);
    if (request == 'R') {
        connection.query("insert into books (image, ISBN, title, author, year, edition, description, rating, category, owner, highlight, publisher, language, book_category) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [image, isbn, title, author, year, edition, description, 1, request, owner, highlight, publisher, language, book_category], (error, rows, fields) => {
            if (error) {
                // res.send(error);
                console.log(error);
                res.redirect("/bookupload/R");
            } else {
                cost = req.body.charges;
                connection.query("insert into rent(isbn, owner, cost) values(?,?,?)", [isbn, owner, cost], (error, rows, fields) => {
                    if (error) {
                        console.log(error);
                        res.redirect(req.url);
                    } else {
                        res.redirect("/rent");
                    }
                })
            }
        });
    } else if (request == 'E') {
        connection.query("insert into books (image, ISBN, title, author, year, edition, description, rating, category, owner, highlight, publisher, language, book_category) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [image, isbn, title, author, year, edition, description, 1, request, owner, highlight, publisher, language, book_category], (error, rows, fields) => {
            if (error) {
                console.log(error);
                res.redirect("/bookupload/E");
            } else {
                btitle = req.body.btitle;
                bauthor = req.body.bauthor;
                connection.query("insert into demand (ISBN, owner, btitle, bauthor) values(?,?,?,?)", [isbn, owner, btitle, bauthor], (error, rows, fields) => {
                    if (error) {
                        console.log(error);
                        res.redirect(req.url);
                    } else {
                        res.redirect("/exchange");
                    }
                })
            }
        });
    } else if (request == 'S') {
        connection.query("insert into books (ISBN,image, title, author, year, edition, description, rating, category, owner, highlight, publisher, language, book_category) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [isbn, image, title, author, year, edition, description, 1, request, owner, highlight, publisher, language, book_category], (error, rows, fields) => {
            if (error) {
                console.log(error);
                // res.send(error);
                res.redirect("/bookupload/S");
            } else {
                price = req.body.price
                connection.query("insert into sell(isbn, owner, price)  value(?,?,?)", [isbn, owner, price], (error, rows, fields) => {
                    if (error) {
                        console.log(error);
                        res.redirect(req.url);
                    } else {
                        res.redirect("/buy");
                    }
                })
            }
        });

    }

})

module.exports = router2;