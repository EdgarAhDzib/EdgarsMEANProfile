var express = require('express');
const mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');

var Promise = require("bluebird");
mongoose.Promise = Promise;

var PORT = process.env.PORT || 3000;

app.use(express.static(process.cwd() + "/public_html") );

app.use(bodyParser.json());
app.use(bodyParser.text());

const articles = require("./config/routes/articles");

app.use("/", articles);

var databaseUri = "mongodb://localhost/portfolio";
// var MONGODB_URI = require('./keys.js');

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect(databaseUri);
}

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