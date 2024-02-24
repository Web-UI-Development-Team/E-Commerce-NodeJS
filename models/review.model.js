
const mongoose = require('mongoose');

const  reviewSchema =  mongoose.Schema({
    title : {type : String , 
    required : [true, 'your title is required']
    },//name
    comment : {
      type : String,
      required : true
    }, 
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

  const Review = mongoose.model('Review', reviewSchema); 
  module.exports = Review; 
