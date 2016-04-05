const mongoose = require('mongoose');

const RestaurantsSchema = new mongoose.Schema({
  address: {
     building: { type: String, default: '' },
     coord: [
     	{ type: Double, default: ''},
     	{ type: Double, default: '' }
     ],
     street: { type: String, default: '' },
     zipcode: { type: String, default: '' }
  },
  borough: { type: String, default: '' },
  cuisine: { type: String, default: '' },
  grades: [
     {
     	date: { type: String, default: '' },
     	grade: { type: String, default: '' },
     	score: { type: INT, default: '' }
     }
  ],
  name: { type: String, default: '' },
  restaurant_id: { type: String, default: '' }
});

module.exports = mongoose.model('Restaurant', RestaurantsSchema);
