const express = require("express");
const router = express.Router();

const Item = require("../models/items");

router.get("/lists/:categ", (req, res) => {
	var categ = req.params.categ;
	Item.find({categ:categ}).exec(function(err, doc){
		if (err) throw err;
		res.json(doc);
	});
});

module.exports = router;