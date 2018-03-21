const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const Menu = new mongoose.Schema({
	keyword: String,
	title: String,
	categ: String,
	image: String,
	items: Array
});

module.exports = mongoose.model("menu", Menu);

// Sites, anecdotes, stories, essays, links