const express = require("express");
const router = express.Router();

const Article = require("../models/articles");

const Item = require("../models/items");

// lists.js not getting accessed in Production, moved here
router.get("/lists/:categ", (req, res) => {
	var categ = req.params.categ;
	Item.find({categ:categ}).exec(function(err, doc){
		if (err) throw err;
		if (doc.length == 0) {
			Article.find({keyword:"index"}).exec(function(error, result){
				if (error) throw error;
				res.json(result);
			});
		} else {
			res.json(doc);
		}
	});
});

router.get("/index", (req, res) => {
	Article.find({keyword:"index"}).exec(function(err, doc){
	// Article.find({keyword:"doopeedoo"}).exec(function(err, doc){
	// Send default index content if query fails
		if (err) throw err;
		if (doc.length == 0) {
			Article.find({keyword:"index"}).exec(function(error, result){
				if (error) throw error;
				res.json(result);
			});
		} else {
			res.json(doc);
		}
	});
});

router.get("/article/:id", (req, res) => {
	var id = req.params.id;
	Article.find({id:id}).exec(function(err, doc){
		if (err) throw err;
		if (doc.length == 0) {
			Article.find({keyword:"index"}).exec(function(error, result){
				if (error) throw error;
				res.json(result);
			});
		} else {
			res.json(doc);
		}
	});
});

router.get("/menu/:categ", (req, res) => {
	var categ = req.params.categ;
	Article.find({categ:categ, pageNo:1}).exec(function(err, doc){
		if (err) throw err;
		if (doc.length == 0) {
			Article.find({keyword:"index"}).exec(function(error, result){
				if (error) throw error;
				res.json(result);
			});
		} else {
			res.json(doc);
		}
	});
});

router.get("/page/:id/:pageNo", (req, res) => {
	var id = req.params.id;
	var pageNo = req.params.pageNo;
	Article.find({id:id, pageNo:pageNo}).exec(function(err, doc){
		if (err) throw err;
		if (doc.length == 0) {
			Article.find({keyword:"index"}).exec(function(error, result){
				if (error) throw error;
				res.json(result);
			});
		} else {
			res.json(doc);
		}
	});
});

// Generate array of background media for random display
router.get("/wallpapers", (req, res) => {
	const imgFolder = './public_html/assets/images/wallpapers/';
	const fs = require('fs');
	var backGrounds = [];

	fs.readdirSync(imgFolder).forEach(file => {
		var mediaTypes = /(\.jpg|\.jpeg|\.png|\.gif|\.mp4)$/i;
		if (mediaTypes.test(file)) {
			backGrounds.push(file);
		}
	});
	res.json(backGrounds);
});

module.exports = router;