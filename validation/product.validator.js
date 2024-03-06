const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const createProduct = joi.object({
    title: joi.string().min(5).max(500).required(),
    description: joi.string().min(5).max(1000).required(),
    price: joi.number().integer().required(),
    discount: joi.number().integer(),
    stock: joi.number().integer().required(),
    brand: joi.string().min(3).max(50).required(),
    category: joi.objectId(),
    thumbnail: joi.string().required(),
    images: joi.array().items(joi.string()),
    rating: joi.number().integer(),
    reviews: joi.array(),
});

const craeteProductValidation = product => createProduct.validate(product);

const updateProduct = joi.object({
    title: joi.string().min(5).max(500),
    description: joi.string().min(5).max(1000),
    price: joi.number().integer(),
    discount: joi.number().integer(),
    stock: joi.number().integer(),
    brand: joi.string().min(3).max(50),
    thumbnail: joi.string(),
    images: joi.array().items(joi.string())
});

const updateProductValidation = product => updateProduct.validate(product);

module.exports = {
    craeteProductValidation,
    updateProductValidation
};