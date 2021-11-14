const express = require('express')
const exphbs = require("express-handlebars")
const path  = require("path")
const fileUpload = require('express-fileupload');
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
app.use(fileUpload());


const mysqlConnection = require("./connection");

const Route = require("./routes/services");
const route1 = require("./routes/main");
const route2 = require("./routes/bookupload");

app.use(express.static("public"))
app.use(express.static("Service"));
app.use(express.static("routes"));

app.get('service.html')

app.use("/", route1);

app.use("/", Route);
app.use("/",route2);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})