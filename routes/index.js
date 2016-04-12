const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurants');
const Comment = require('../models/comment');

/* GET home page. */
router.get('/', function(req, res, next) {
    Comment
        .find({})
        .sort('-createdDate')
        .limit(10)
        .exec((err,comments) => res.render('index',{comments}))

    Restaurant
        .findOne({}, 'grades', function(err, restaurants) {
            
            Restaurant.aggregate([
                { $match: { _id: restaurants._id } },
                {
                    $group: {
                        _id: '$_id', 
                        average: {$avg: '$grades.score'}
                    }
                }
            ], function (err, result) {console.log(result)});
        });

  
});

module.exports = router;
