const express = require('express')
const exphbs = require("express-handlebars")
const path  = require("path")
const app = express()
const port = 3030

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const mysqlConnection = require("./connection");

const Route = require("./routes/services");
const route1 = require("./routes/main");

app.use(express.static("public"))
app.use(express.static("Service"));

app.get('service.html')

app.use("/", route1);

app.use("/", Route);


// app.use(express.static(__dirname + 'public'));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/main.html"))
// //   res.sendFile(path.join(__dirname,"main.scss"))
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})