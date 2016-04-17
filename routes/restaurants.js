"use strict";

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

/* Filter to get all type of cuisines and every borough */
const getFilter = ((filter) => {  
  return Restaurants.find().distinct(filter).sort().exec();
});


/* GET restaurants listing for page n using query string. */
router.get('/', function(req, res, next) {
  let resto;
  let cuisines;
  let thisPage = req.query.p ? req.query.p : 1;
  let thisCuisine = req.query.cuisine;
  let thisBorough = req.query.borough;
  let objectQuery = {
    name: {$ne: ''}
  };
  if (thisCuisine) {objectQuery.cuisine = thisCuisine.toString()};
  if (thisBorough) objectQuery.borough = thisBorough.toString();
  Restaurants.paginate(objectQuery, {limit: 10, sort: 'name', page: thisPage}).then((restaurants) => {
    resto = restaurants;
    return getFilter('cuisine');
  }).then((allCuisine) => {
    cuisines = allCuisine;
    return getFilter('borough');
  }).then((boroughs) => {
    res.render('restaurants/index', {restaurants: resto, cuisines, boroughs, thisPage, thisCuisine, thisBorough});
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


/**
 * POST - Route to create a new comment for a restaurant
 */

router.post('/view/:restaurant_id', function(req,res){
	Restaurant
		.findOne({ restaurant_id: req.params.restaurant_id})
		.then((restaurant) => {
			const commentToCreate = Object.assign({},req.body,{restaurant})
			return Comment.create(commentToCreate,(err, comment) => {
							if(err) console.log('ERROR :', err)
						});
		})
		.then((comment) => {
			// Need to find a proper way to return the updated restaurant
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
