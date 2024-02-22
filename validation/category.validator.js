const joi = require('joi');

const schema = joi.object({
    nameCategory: joi.string().max(500).required(),
});

const categoryValidation = category => schema.validate(category);

module.exports = {categoryValidation};