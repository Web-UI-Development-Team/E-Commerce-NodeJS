const mongoose = require('mongoose');
const Book = require('./book.model.js');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 15,
        minLength: 3
    },
    encryptedPass: {
        type: String,
        required: true,
        maxLength: 250,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
        minLength: 3
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
})

const User = mongoose.model('User', userSchema);

module.exports = User;