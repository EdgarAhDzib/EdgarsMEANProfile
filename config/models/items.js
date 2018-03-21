const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const Item = new mongoose.Schema({
	title: String,
	categ: String,
	link: String,
	description: String,
	image: String
});

module.exports = mongoose.model("item", Item);

// Sites, anecdotes, stories, essays, links