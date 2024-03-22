const joi = require("joi");

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

const validateNewUser = (user) => {
  const schema = joi.object({
    name: joi.string().min(5).max(20).required(),
    email: joi.string().regex(emailPattern).required(),
    phone: joi.string().regex(phonePattern).min(12).max(12).required(),
    image: joi.string(),
    password: joi.string().min(8).required(),
    isAdmin: joi.boolean(),
    isDeleted: joi.boolean(),
  });
  
  return schema.validate(user);
};

const updateUserValidation = (user) => {
  const schema = joi.object({
    name: joi.string().min(5).max(20),
    email: joi.string().regex(pattern),
    phone: joi.number().min(11).max(11),
    image: joi.string(),
    password: joi.string().min(8),
    isAdmin: joi.boolean(),
    isDeleted: joi.boolean(),
  });
  return schema.validate(user);
};

const validateLogin = (user) => {
  const schema = joi.object({
    email: joi.string().regex(emailPattern).required(),
    password: joi.string().min(8).required(),
  });

  return schema.validate(user);
};

module.exports = {
  validateNewUser,
  validateLogin,
  updateUserValidation,
};
