const express = require("express");
const path = require("path")
const router = express.Router();

const mysqlConnection = require("../connection");
const router2 = require("./bookupload");

express().use(express.static(path.join(__dirname, "../public")))







