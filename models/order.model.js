const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: Object,
        required: true
    }],
    shippingAddress: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Canceled'],
        default: "Pending",
    },
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOfOrder: {
        type: Date,
        default: Date.now
    }

})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order;