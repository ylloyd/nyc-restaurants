const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  author: String,
  body:   String,
  createdDate: { type: Date, default: Date.now },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

module.exports = mongoose.model('Comment', commentSchema);
