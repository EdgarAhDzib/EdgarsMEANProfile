const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const Article = new mongoose.Schema({
	keyword: String,
	title: String,
	subTitle: String,
	id: Number,
	categ: String,
	contents: String,
	pageNo: Number,
	images: Array
});

module.exports = mongoose.model("article", Article);