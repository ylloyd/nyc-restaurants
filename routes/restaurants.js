var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurants');

const mongoose = require('mongoose');
const Restaurants = mongoose.model('Restaurant');

// Model available :
// eg. Restaurant.find({...}).exec().then(...)

const getFilter = ((filter) => {  /* GET restaurants listing for page n. */   
  Restaurants.find().distinct(filter).sort().exec().then((myFilter) => {
      //console.log(myFilter);
      return myFilter;
    }), ((err) => {
      console.log(err)
    });
});


/* GET restaurants listing for page 1. */
router.get('/', function(req, res, next) {
  Restaurants.paginate({},{limit:10, sort:'name'}).then((restaurants) => {
    const cuisines = getFilter('cuisine');
    console.log(cuisines);
    res.render('restaurants/index', {restaurants});
  }), ((err) => {
    console.log(err)
  });
});

/* GET restaurants listing for page n. */
router.get('/:page', function(req, res, next) {
  //console.log(next);
  Restaurants.paginate({},{limit:10, sort:'name', page:req.params.page}).then((restaurants) => {
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

module.exports = router;
