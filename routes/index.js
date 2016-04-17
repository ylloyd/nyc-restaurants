const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurants');
const Comment = require('../models/comment');

/* GET home page. */
router.get('/', function(req, res, next) {
    const p1 = Comment
                    .find({})
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

    // Restaurant
    //     .findOne({}, 'grades', function(err, restaurants) {
            
    //         Restaurant.aggregate([
    //             { $match: { _id: restaurants._id } },
    //             {
    //                 $group: {
    //                     _id: '$_id', 
    //                     average: {$avg: '$grades.score'}
    //                 }
    //             }
    //         ], function (err, result) {console.log(result)});
    //     });

  
});

module.exports = router;
