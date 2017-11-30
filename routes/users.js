var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Order = require('../models/order');

// Register get
router.get('/register', function(req, res){
	res.render('register');
});
// Register post
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name cannot be empty').notEmpty();
	req.checkBody('email', 'Email cannot be empty').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username cannot be empty').notEmpty();
	req.checkBody('password', 'Password cannot be empty').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

// Login get
router.get('/login', function(req, res){
	res.render('login');
});

// login post
router.post('/login',
passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
function(req, res) {
	res.redirect('/users/account');
});

// account
router.get('/account', 
	 function(req, res){
		 if(req.user == null){
			res.redirect('/users/login');
		 }
		 else{
				Order.getOrders(function(err, orders){
					if(err){
						throw err;
					}
					// console.log (orders);
				res.render('account', { user: req.user, orders: orders});
			}); 
		 }
});//render with user info

// Update account
//get
router.get('/account/edit', 
function(req, res){
res.render('register', { user: req.user}); //render with user info
});
//post
router.post('/account/edit', function(req, res){
	var user = req.body;
	User.updateUser(user._id, user, function(err, users){
		if(err){
			throw err;
		}
		req.logout();
		req.flash('success_msg', 'Update usccessful. Please login with new information.');
		res.redirect('/users/login');
	});	
});

// logout
router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = router;