var express = require('express');
const mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');

var Promise = require("bluebird");
mongoose.Promise = Promise;

var PORT = process.env.PORT || 50000;

app.use(express.static(process.cwd() + "/public_html") );

app.use(bodyParser.json());
app.use(bodyParser.text());

const articles = require("./config/routes/articles");
const mailer = require("./config/routes/mailer");
app.use("/", articles);
app.use("/", mailer);

// var databaseUri = "mongodb://localhost/portfolio";
var databaseUri = "mongodb://127.0.0.1/portfolio";
mongoose.connect(databaseUri);

var db = mongoose.connection;

db.on("error", function(err){
	console.log("Mongoose error: ", err);
});

db.once("open", function() {
	console.log("Mongoose connection successful.");
});

app.listen(PORT, function() {
	console.log("App listening on PORT ", PORT);
})