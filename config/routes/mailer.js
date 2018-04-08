var nodemailer = require('nodemailer');
const keys = require('../../keys.js');
const express = require("express");
const router = express.Router();

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: keys
});

router.post("/mailer", (req, res) => {
	// Validations on post, to ensure all fields 
	if (req.body.name.trim() == "" || req.body.message.trim() == "") {
		// Set property to determine email form reset
		res.json({reset: false, response: "Form incomplete, please retry."});
		return;
	}
	// Replace line breaks with HTML for email display
	var message = req.body.message.replace(/(?:\r\n|\r|\n)/g, '<br/>');

	// Validation RegEx from https://www.w3resource.com/javascript/form/email-validation.php
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.address)) {
		res.json({reset: false, response: req.body.address + " is an invalid email."});
		return;
	} else {
		// Complete the delivery
		var mailOptions = {
			from: '"' + req.body.name + '" <' + req.body.address + '>', // Actually "from" E@GC
			to: 'edgarmdcesp@gmail.com',
			subject: req.body.subject,
			text: message,
			html: '"' + req.body.name + '" ' + req.body.address + '<br/>' + message
		};

		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
		res.json({reset: true, response: "Your message has been sent!"});
		return;
	}

});

module.exports = router;