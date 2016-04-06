const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const RestaurantsSchema = new mongoose.Schema({
  address: {
     building: { type: String, default: '' },
     coord: [
     	{ type: Number, default: ''},
     	{ type: Number, default: '' }
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
     	score: { type: Number, default: '' }
     }
  ],
  name: { type: String, default: '' },
  restaurant_id: { type: String, default: '' }
});

RestaurantsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Restaurant', RestaurantsSchema);
