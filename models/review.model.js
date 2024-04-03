
const mongoose = require('mongoose');

const  reviewSchema =  mongoose.Schema({ 
    title : {type : String , 
    required : [true, 'your title is required']
    },//name
    comment : {
      type : String,
      required : true
    }, 
    dateOfReview:{
      type:Date,
      default:Date.now
  },
    user : {
      type : mongoose.Schema.Types.ObjectId, 
      ref : 'User', 
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
