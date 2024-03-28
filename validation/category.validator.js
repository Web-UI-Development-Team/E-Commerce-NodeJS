const joi = require("joi");

const schema = joi.object({
  nameCategory: joi.string().max(500).required(),
  description: joi.string().max(2500).required(),
  icon: joi.string().required(),
});

const categoryValidation = (category) => schema.validate(category);

const updatedCategory = joi.object({
  nameCategory: joi.string().max(500),
  description: joi.string().max(2500),
  icon: joi.string(),
});

const updateCategoryValidator = (category) =>
  updatedCategory.validate(category);

module.exports = { categoryValidation, updateCategoryValidator };
