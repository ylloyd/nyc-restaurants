var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurants');

const mongoose = require('mongoose');
const Restaurants = mongoose.model('Restaurant');

// Model available :
// eg. Restaurant.find({...}).exec().then(...)

/* GET restaurants listing for page 1. */
router.get('/', function(req, res, next) {
	Restaurants.paginate({ createdOn: { $lte: req.createdOnBefore } },{limit:10, sort:'-createdOn'}).then((restaurants) => {
		//console.log(restaurants);
		res.render('restaurants/index', {restaurants});
	}), ((err) => {
		console.log(err)
	});
});

/* GET restaurants listing for page n. */
router.get('/:page', function(req, res, next) {
	console.log(req.params.page);
	Restaurants.paginate({ createdOn: { $lte: req.createdOnBefore } },{limit:10, sort:'-createdOn', page:req.params.page}).then((restaurants) => {
		//console.log(restaurants);
		res.render('restaurants/index', {restaurants});
	}), ((err) => {
		console.log(err)
	});
});

/* GET specific restaurant. */
router.get('/view/:restaurant_id', function(req, res, next) {
	Restaurants.find({restaurant_id:req.params.restaurant_id}).then((restaurant) => {
		console.log(restaurant);
		res.render('restaurants/restaurant', {restaurant});
	}), ((err) => {
		console.log(err)
	});
});

router.get('/view/:id', (req, res, next) => {
    console.log(req.params.id)
    Restaurant.findById(req.params.id, function (err, restaurant) {
      if (err) console.log(err);
      if (restaurant) {
        res.render('restaurants/view',restaurant)
      } else{
        res.json({status:404, 'message': 'Did not found user with that password'});
      }
    })

})

module.exports = router;
