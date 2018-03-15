const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const Article = new mongoose.Schema({
	keyword: String,
	id: Number,
	categ: String,
	contents: Array
});

module.exports = mongoose.model("article", Article);