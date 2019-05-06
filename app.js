const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

const port = 3000;

const router = require("./routes");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

// Add CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose.connect("mongodb://localhost/mobile_shopping", {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use("/api", router);
app.get("/", (req, res) => res.send("Hello My Friends"));

app.listen(port, () =>
  console.log(`Mobile Shopping API listening on port ${port}`)
);

module.exports = app;
