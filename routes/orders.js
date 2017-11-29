var express = require('express');
var router = express.Router();
var Tea = require('../models/tea');

// Get All orders
router.get('/', function(req, res){
	Tea.getTeas(function(err, teas){
		if(err){
			throw err;
		}
		res.render('orders', {
			teas:teas
		}); 
	});
});

// Get Tea
router.get('/:_id/edit', function(req, res){
	Tea.getTeaById(req.params._id, function(err, tea){
		if(err){
			throw err;
		}
		res.render('orders', {
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
		res.redirect('/orders'); //render with orders;
	});
});

// Update Tea
router.post('/:_id', function(req, res){
	var tea = req.body;
	Tea.updateTea(req.params._id, tea, function(err, teas){
		if(err){
			throw err;
		}
		res.redirect('/orders'); //render with orders;
	});	
});

//Delete Tea
router.get('/:_id/delete', function(req, res){
	var id = req.params._id;
	console.log("server is deleting", id);
	Tea.removeTea(id, function(err, teas){
		console.log("db is deleting", teas);
		res.redirect('/orders'); 
	});
});
module.exports = router;