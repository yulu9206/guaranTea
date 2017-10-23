var express = require('express');
var router = express.Router();
var Tea = require('../models/tea');

// Get All Teas
router.get('/', function(req, res){
	Tea.getTeas(function(err, teas){
		if(err){
			throw err;
		}
		res.render('teas'); // render with teas
	});
});

// Get Tea
router.get('/teas/:_id', function(req, res){
	Tea.getTeaById(req.params._id, function(err, teas){
		if(err){
			throw err;
		}
		res.json(tea); // render with tea;
	});
});

// Add Tea
router.post('/', function(req, res){
	var tea = req.body;
	Tea.addTea(tea, function(err, tea){
		if(err){
			throw err;
		}
		res.redirect('/'); //render with teas;
	});
});

// Update Tea
router.put('/teas/:_id', function(req, res){
	var tea = req.body;
	Tea.updateTea(req.params._id, tea, function(err, teas){
		if(err){
			throw err;
		}
		res.json(teas); //render with teas;
	});	
});

//Delete Tea
router.delete('/teas/:_id', function(req, res){
	var id = req.params._id;
	Tea.removeTea(id, function(err, teas){
		res.json(teas); //render with teas;
	});
});

module.exports = router;