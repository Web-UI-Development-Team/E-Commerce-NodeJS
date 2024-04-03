const joi = require('joi');

const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

const validateUserProfile = (user) => {
    const schema = joi.object({
        name: joi.string().min(5).max(20),
        email: joi.string().regex(pattern),
        phone: joi.string().regex(phonePattern).min(11).max(11),
        imagePath: joi.string(),
        password: joi.string().min(8)
    });

    return schema.validate(user);
}

module.exports = {
    validateUserProfile
}