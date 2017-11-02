var express = require('express');
var router = express.Router();
var Tea = require('../models/tea');

// Get All Teas
router.get('/', function(req, res){
	Tea.getTeas(function(err, teas){
		if(err){
			throw err;
		}
		res.render('teas', {
			teas:teas
		}); 
	});
});

// Get Tea
router.get('/:_id/update', function(req, res){
	Tea.getTeaById(req.params._id, function(err, tea){
		if(err){
			throw err;
		}
		res.redirect('/', {
			tea:tea
		}); 
	});
});

// Add Tea
router.post('/', function(req, res){
	var tea = req.body;
	Tea.addTea(tea, function(err, tea){
		if(err){
			throw err;
		}
		res.redirect('/teas'); //render with teas;
	});
});

// Update Tea
router.post('/:_id', function(req, res){
	var tea = req.body;
	Tea.updateTea(req.params._id, tea, function(err, teas){
		if(err){
			throw err;
		}
		res.redirect('/teas'); //render with teas;
	});	
});

//Delete Tea
router.get('/:_id/delete', function(req, res){
	var id = req.params._id;
	console.log("server is deleting", id);
	Tea.removeTea(id, function(err, teas){
		console.log("db is deleting", teas);
		res.redirect('/teas'); 
	});
});
module.exports = router;