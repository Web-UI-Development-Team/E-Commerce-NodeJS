const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }],
    shippingAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'pending',
        // required:true
    },
    totalPrice:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    dateOfOrder:{
        type:Date,
        default:Date.now
    }

})
const Order=mongoose.model('Order',orderSchema)
module.exports=Order;