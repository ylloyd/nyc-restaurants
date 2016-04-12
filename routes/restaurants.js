"use strict";

var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurants');

const mongoose = require('mongoose');
const Restaurants = mongoose.model('Restaurant');

// Model available :
// eg. Restaurant.find({...}).exec().then(...)

/* Filter to get all type of cuisines and every borough */
const getFilter = ((filter) => {  
  return Restaurants.find().distinct(filter).sort().exec();
});


/* GET restaurants listing for page n using query string. */
router.get('/', function(req, res, next) {
  let resto;
  let thisPage = req.query.p ? req.query.p : 1;
  Restaurants.paginate({name: {$ne: ''}}, {limit:10, sort:'name', page: thisPage}).then((restaurants) => {
    resto = restaurants;
    console.log(restaurants);
    return getFilter('cuisine');
    //res.render('restaurants/index', {restaurants});
  }).then((cuisines) => {
    //console.log(cuisines);
    res.render('restaurants/index', {restaurants: resto, cuisines});
  });
});


// /* GET restaurants listing for page n. */
// router.get('/:page', function(req, res, next) {
//   //console.log(next);
//   Restaurants.paginate({}, {limit:10, sort:'name', page:req.params.page}).then((restaurants) => {
//     //console.log(restaurants);
//     res.render('restaurants/index', {restaurants});
//   }, (err) => {
//     console.log(err)
//   });
// });



/* GET specific restaurant. */
router.get('/view/:restaurant_id', function(req, res, next) {
  Restaurants.find({restaurant_id:req.params.restaurant_id}).then((restaurant) => {
    console.log(restaurant);
    res.render('restaurants/restaurant', {restaurant});
  }), ((err) => {
    console.log(err)
  });
});

module.exports = router;
