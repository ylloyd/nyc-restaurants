var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurants');

const Comment = require('../models/comment');

const mongoose = require('mongoose');
const Restaurants = mongoose.model('Restaurant');
const moment = require('moment');
const _ = require('lodash');

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
	Restaurant
		.findOne({restaurant_id:req.params.restaurant_id})
		.populate('comments')
		.then(
			(restaurant) => {
				_.each(restaurant.grades, (g) => g.date = moment(g.date).format('DD/MM/YYYY'));
				res.render('restaurants/restaurant', {restaurant});
			}, 
			(err) => console.log(err) 
		);
});


router.post('/view/:restaurant_id', function(req,res){
	// Pyramid pattern spotted -> to refactor ?
	Comment
		.create(req.body,(err, comment) => {
			if(err) console.log('ERROR :', err)
		})
		.then(comment => {
			// Double Query Mongo-> need to refactor
			Restaurant
				.update(
				  { restaurant_id: req.params.restaurant_id},
				  { $push:{ "comments": comment._id}},
				  { upsert:true }
				 )
				.exec()
			Restaurant
				.findOne({ restaurant_id: req.params.restaurant_id})
				.populate('comments')
				.then(
					(restaurant) => res.render('restaurants/restaurant', {restaurant}), 
					(err) => console.log(err) 
				);		
		})


})


module.exports = router;
