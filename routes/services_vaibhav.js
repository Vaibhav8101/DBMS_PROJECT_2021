const mysql = require("mysql");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");//for reading form data
const encoder = bodyParser.urlencoded();
let instance = null;

const app = express();
const connection = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6447609",
    password: "GDlm6fL6Uc",
    port: 3306,
    database: "sql6447609"

});

connection.connect(function (error) {
    if (error) throw error
    else console.log("connected to the database successfully!")
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM student;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = DbService;


