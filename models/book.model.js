const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        maxLength: 512,
        required: true 
    },
    author: {
        type: String,
        minLength: 3,
        maxLength: 512,
    },
    publish: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;