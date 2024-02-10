const joi = require('joi');

const validateNewBook = (book) =>{
    const schema = joi.object({
        title: joi.string().min(3).max(50).required(),
        author: joi.string().min(3).max(50).required(),
        publish: joi.number()
    });

    return schema.validate(book);
}

const validateUpdateBook = (book) =>{
    const schema = joi.object({
        title: joi.string().min(3).max(50),
        author: joi.string().min(3).max(50),
        publish: joi.number()
    });

    return schema.validate(book);
}

module.exports = {
    validateNewBook,
    validateUpdateBook
}