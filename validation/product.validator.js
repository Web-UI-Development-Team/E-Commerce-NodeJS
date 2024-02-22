const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)

const schema = joi.object({
    title: joi.string().min(5).max(500).required(),
    description: joi.string().min(5).max(1000).required(),
    price: joi.number().integer().required(),
    stock: joi.number().integer().required(),
    brand: joi.string().min(3).max(50).required(),
    category: joi.objectId(),
    thumbnail: joi.string().required(),
    images: joi.array().items(joi.string())
});

const productValidation = product => schema.validate(product);

module.exports = productValidation;