const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser"); //importing the body parser
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Welcome to our hotel");
  console.log(req);
});

const personRoutes = require('./routes/personRoutes');
const menuItemRouter = require('./routes/menuRoutes');

app.use('/person', personRoutes); //middleware for executing the person routes
app.use('/menu', menuItemRouter); //middleware for executing the menuitem routes

app.listen(5050, () => {
  console.log("server is runing on port 5050");
});
