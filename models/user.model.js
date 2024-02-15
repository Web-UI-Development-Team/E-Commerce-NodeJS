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
    shoppingCart:[
        // {
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'Product'
        // }
    ],
    encryptedPassword: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;