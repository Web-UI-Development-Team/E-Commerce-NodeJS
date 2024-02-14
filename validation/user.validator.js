const joi = require('joi');

const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validateNewUser = (user) =>{
    const schema = joi.object({
        name: joi.string().min(5).max(20).required(),
        email: joi.string().regex(pattern).required(),
        password: joi.string().min(8).required(),
        isAdmin: joi.boolean().required()
    });

    return schema.validate(user);
}

const validateLogin = (user) =>{
    const schema = joi.object({
        email: joi.string().regex(pattern).required(),
        password: joi.string().min(8).required()
    });

    return schema.validate(user);
}

module.exports = {
    validateNewUser,
    validateLogin
}