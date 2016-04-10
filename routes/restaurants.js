var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurants');

// Model available :
// eg. Restaurant.find({...}).exec().then(...)

/* GET restaurants listing. */
router.get('/', function(req, res, next) {
  res.render('restaurants/index', {});
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
