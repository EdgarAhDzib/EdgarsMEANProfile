const express = require("express");
const router = express.Router();

const Article = require("../models/articles");

router.get("/index", (req, res) => {
	Article.find({keyword:"index"}).exec(function(err, doc){
		if (err) throw err;
		res.json(doc);
	});
});

router.get("/article/:id", (req, res) => {
	var id = req.params.id;
	Article.find({id:id}).exec(function(err, doc){
		if (err) throw err;
		res.json(doc);
	});
});

router.get("/menu/:categ", (req, res) => {
	var categ = req.params.categ;
	Article.find({categ:categ, pageNo:1}).exec(function(err, doc){
		if (err) throw err;
		res.json(doc);
	});
});

module.exports = router;