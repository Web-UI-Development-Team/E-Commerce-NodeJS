const services = require('../services/profile.service');
const jwt = require("jsonwebtoken");
const validator = require("../validation/profile.validator");
const bycrypt = require('bcrypt');
const User = require('../models/user.model');

const getUserProfile = async (req, res) => {
    const user = req.auth;

    res.send({
        name: user.name,
        email: user.email
    });
};

const updateUserProfile = async (req, res) => {
    let _name, email, encryptedPassword;
    try {
        const { error, value } = validator.validateUserProfile(req.body);

        if (error) {
            return res.status(422).send({ message: error.message });
        }

        const user = req.auth;

        if (!req.body.email) email = user.email;
        else email = req.body.email;

        if (!req.body.name) _name = user.name;
        else _name = req.body.name;

        if (!req.body.password) encryptedPassword = user.encryptedPassword;
        else encryptedPassword = await bycrypt.hash(req.body.password, 10)

        await services.updateUserProfileService(payload.email, { name: _name, email, encryptedPassword });

        res.send(req.body);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile
}