const express = require("express");
const router = express.Router();

const Article = require("../models/articles");

router.get("/test", (req, res) => {
	Article.find({id:1}).exec(function(err, doc){
		if (err) throw err;
		if (doc) console.log(doc);
		res.json(doc);
	});
});

router.get("/article/:id", (req, res) => {
	var id = req.params.id;
	Article.find({id:id}).exec(function(err, doc){
		if (err) throw err;
		// if (doc) console.log(doc);
		res.json(doc);
	});
});

module.exports = router;