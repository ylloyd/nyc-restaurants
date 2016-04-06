var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurants');

const mongoose = require('mongoose');
const Restaurants = mongoose.model('Restaurant');

// Model available :
// eg. Restaurant.find({...}).exec().then(...)

/* GET restaurants listing. */
router.get('/', function(req, res, next) {
	Restaurants.find().exec().then((restaurants) => {
		console.log(restaurants);
		res.render('restaurants/index', {restaurants});
	});
		
});

module.exports = router;
