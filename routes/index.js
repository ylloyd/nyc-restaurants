var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurants');

/* GET home page. */
router.get('/', function(req, res, next) {
  Restaurant.find({restaurant_id:'30112340'}).then((restaurant) => {
    console.log(restaurant);
    res.render('restaurants/restaurant', {restaurant});
  }), ((err) => {
    console.log(err)
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
