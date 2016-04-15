"use strict";

var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurants');
var Comment = require('../models/comment');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   Restaurant.find({restaurant_id:'30112340'}).then((restaurant) => {
//     console.log(restaurant);
//     res.render('restaurants/restaurant', {restaurant});
//   }), ((err) => {
//     console.log(err)
//   });
//   res.render('index', { title: 'Express' });
// });

const getComments = (() => {
	return Comment.find({}).sort('-createdDate').limit(10).exec();
});

router.get('/', function(req, res, next) {
    let comments;
    let resto;

    Restaurant.aggregate([{$unwind:'$grades'}, {$match:{'grades.score': { $ne : 0 } }}, {$group:{_id: {id:'$_id', name:'$name', cuisine:'$cuisine', address:'$address.building'}, average: {$avg: '$grades.score'}}}]).sort('-average').limit(10).exec().then((restaurants) => {
    	resto = restaurants;
    	return getComments();
    }).then((comments) => {
      	//console.log(resto);
      	res.render('index', {restaurants: resto, comments});
    });
});

module.exports = router;
