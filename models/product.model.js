const mongoose = require('mongoose');

//
const reviewSchema =  mongoose.Schema({
  name : {type : String , 
  required : [true, 'your name is required']
  },//name
  Comment : {
    type : String
  }, //comment
  user : {
    type : mongoose.Schema.Types.ObjectId, 
    ref : 'user', 
    required : [true , 'user is required']
  }
})


const productSchema = mongoose.Schema({
  //
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true 
    },
    price: { 
        type: Number,
        required: true
    },
    stock: { 
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Category',
        required : [true , 'user is required']
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    }, 
    reviews : [reviewSchema], // the schema above
    rating: {type : Number , default : 0}, // it's not nessesery to add rate
}); 

const Product = mongoose.model('Product', productSchema); 

module.exports = Product; 