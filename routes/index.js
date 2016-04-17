"use strict";

var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurants');
var Comment = require('../models/comment');

/* GET home page. */
router.get('/', function(req, res, next) {
    const p1 = Comment
                    .find({})
                    .populate('restaurant')
                    .sort('-createdDate')
                    .limit(10)
                    // .exec((err,comments) => res.render('index',{comments}))

    const p2 = Restaurant
                    .aggregate([
                        {$unwind:'$grades'},
                        {$match:{'grades.score': { $ne : 0 } }}, 
                        {$group:
                            {
                                _id: {
                                    id:'$_id', 
                                    name:'$name',
                                    cuisine:'$cuisine', 
                                    restaurant_id: '$restaurant_id'
                                }, 
                                average: {$avg: '$grades.score'}
                            }
                        }
                    ])
                    .sort('-average')
                    .limit(10)
                    .exec()

    Promise
        .all([p1,p2])
        .then((data) => {
            res.render('index', {
                comments: data[0],
                bestRestaurants: data[1]
            });
        });
  
});

module.exports = router;
