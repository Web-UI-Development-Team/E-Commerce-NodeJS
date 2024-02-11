const Book = require('../models/book.model');

const allBooks = async ()=>{
    return await Book.find();
};

const bookById = async (id)=>{
    return await Book.find({_id: id});
};

const newBook = async (book)=>{
    return await Book.create(book);
};

const modifyBook = async (id, body)=>{
    return await Book.updateOne({_id: id}, body);
}

const removeBook = async (id)=>{
    return await Book.deleteOne({_id: id});
}

module.exports = {
    allBooks,
    bookById,
    newBook,
    modifyBook,
    removeBook
}