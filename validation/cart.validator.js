const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)

const cartSchema = joi.object({
    product: joi.objectId().required(),
    quantity: joi.number()
});

const quantitySchema = joi.object({
    quantity: joi.number().required()
});

const cartValidation = cart => cartSchema.validate(cart);

module.exports = {
    cartValidation
};