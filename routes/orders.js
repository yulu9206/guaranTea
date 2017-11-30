var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var Tea = require('../models/tea');

// Get All Teas
// router.get('/', function(req, res){
// 	Tea.getTeas(function(err, teas){
// 		if(err){
// 			throw err;
// 		}
// 		res.render('teas', {
// 			teas:teas
// 		}); 
// 	});
// });

// Get Order
router.get('/:_id/edit', function(req, res){
	Order.getOrderById(req.params._id, function(err, order){
		if(err){
			throw err;
		}
		res.render('orders', {
			order:order
		}); 
	});
});

// Add Order
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

router.post('/', function(req, res){
	var teanames = 
	[ 'Boba Milk Tea',
	  'Honey Orange Tea',
	  'Red Bean Green Tea',
	  'Light Lemon Tea',
	  'Classis Black Tea',
	  'Milk Foam Lemon Tea',
	  'Premium Lemmon Tea',
	  'Icy Lemon Tea',
	  'Red Bean Top Milk Tea',
	  'Classic Milk Tea',
	  'Lemon Sorbet',
	  'Pudding Top Milk Tea' ];
	var quantities = req.body;
	var order = {};
	for(var i = 0; i < quantities.length; i++)
	{
		if (quantities[i] != 0) 
		{
			order[teanames[i]] = quantities[i];
		}
	}
	console.log(order);
	Order.addOrder(order, function(err, order){
		if(err){
			throw err;
		}
		res.redirect('/users/account'); //render with orders;
	});
});

// Update Order
router.post('/:_id', function(req, res){
	var teanames = 
	[ 'Boba Milk Tea',
	  'Honey Orange Tea',
	  'Red Bean Green Tea',
	  'Light Lemon Tea',
	  'Classis Black Tea',
	  'Milk Foam Lemon Tea',
	  'Premium Lemmon Tea',
	  'Icy Lemon Tea',
	  'Red Bean Top Milk Tea',
	  'Classic Milk Tea',
	  'Lemon Sorbet',
	  'Pudding Top Milk Tea' ];
	var quantities = req.body;
	var order = {};
	for(var i = 0; i < quantities.length(); i++)
	{
		if (quantities[i] != 0) 
		{
			order[teanames[i]] = quantities[i];
		}
	}
	Order.updateOrder(req.params._id, order, function(err, orders){
		if(err){
			throw err;
		}
		res.redirect('/orders'); //render with orders;
	});	
});

//Delete Order
router.get('/:_id/delete', function(req, res){
	var id = req.params._id;
	console.log("server is deleting", id);
	Order.removeOrder(id, function(err, orders){
		console.log("db is deleting", orders);
		res.redirect('/orders'); 
	});
});
module.exports = router;