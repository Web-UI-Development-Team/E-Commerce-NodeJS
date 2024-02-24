
const mongoose = require('mongoose');

const  reviewSchema =  mongoose.Schema({
    title : {type : String , 
    required : [true, 'your title is required']
    },//name
    comment : {
      type : String
    }, //comment
    user : {
      type : mongoose.Schema.Types.ObjectId, 
      ref : 'user', 
      required : [true , 'user is required']
    }
  })

  const Review = mongoose.model('Review', reviewSchema); 
  module.exports = Review; 
