const mongoose = require("mongoose");

const cartShecma = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const Cart = mongoose.model('Cart', cartShecma);
module.exports = Cart;