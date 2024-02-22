const joi = require('joi');

const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validateUserProfile = (user) =>{
    const schema = joi.object({
        name: joi.string().min(5).max(20),
        email: joi.string().regex(pattern)
    });

    return schema.validate(user);
}

module.exports = {
    validateUserProfile
}