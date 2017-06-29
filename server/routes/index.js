var express = require('express');
var router = express.Router();
var moviecontroller = require('../controller/moviecontroller.js');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*------function for my app--------*/
module.exports = function(passport){
    router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});
    /*routes for signup */
router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/login.html',
		failureRedirect: '/signup.html',
		failureFlash : true
	}));
/*routes for login */
router.post('/login', passport.authenticate('login', {
		successRedirect: '/movie.html',
		failureRedirect: '/signup.html',
		failureFlash : true
	}));

router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

router.get('/search', moviecontroller.search);

router.post('/addFav', moviecontroller.addFav);

router.get('/viewFav', moviecontroller.viewFav);

router.get('/deleteFav', moviecontroller.deleteFav);

return router;
}
