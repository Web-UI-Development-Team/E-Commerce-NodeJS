const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://i.pinimg.com/736x/62/40/7c/62407c28a46d83340a2eec55a640e4ad.jpg"
    },
    wishList: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        default: []
    }],
    encryptedPassword: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;