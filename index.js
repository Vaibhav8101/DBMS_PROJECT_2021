const express = require('express')
const exphbs = require("express-handlebars")
const path  = require("path")
const app = express()
const port = 3030
var session = require('express-session')
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');// trust first proxy
// app.set('trust proxy', 1)
app.use(session({
  secret: 'gs*J^v&k#B3tRHrz',
  resave: false,
  saveUninitialized: true,
}))

const mysqlConnection = require("./connection");

const Route = require("./routes/services");
const route1 = require("./routes/main");

app.use(express.static("public"))
app.use(express.static("Service"));

app.get('service.html')

app.use("/", route1);

app.use("/", Route);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})