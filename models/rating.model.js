const mongoose = require('mongoose');
// 
const  ratingSchema =  mongoose.Schema({
  rate : {type : Number},
   user : {
    type : mongoose.Schema.Types.ObjectId, 
    ref : 'user', 
    required : [true , 'user is required']
  },
  product : {
    type : mongoose.Schema.Types.ObjectId, 
    ref : 'Product', 
    required : [true , 'Product is required']
  }, 
  })
  const Rating = mongoose.model('Rating',ratingSchema);
  module.exports = Rating;  