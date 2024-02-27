const services = require('../services/profile.service');
const jwt = require("jsonwebtoken");
const validator = require("../validation/profile.validator");
const bycrypt = require('bcrypt');
const User = require('../models/user.model');

const getUserProfile = async (req, res) => {
    const token = req.headers["jwt"];

    if (!token) {
        return res.status(401).send({ message: "unauthorized user" });
    }

    const payload = jwt.verify(token, "myjwtsecret");

    const user = await services.getUserProfileService(payload.email);

    if (!user) {
        return res.status(404).send({ message: "not found" });
    }

    res.send({
        name: user.name,
        email: user.email
    });
}

const updateUserProfile = async (req, res) => {
    let _name, email, encryptedPassword;
    try {
        const { error, value } = validator.validateUserProfile(req.body);

        if (error) {
            return res.status(422).send({ message: error.message });
        }

        const token = req.headers["jwt"];

        if (!token) {
            return res.status(401).send({ message: "unauthorized user" });
        }

        const payload = jwt.verify(token, "myjwtsecret");

        const user = await services.getUserProfileService(payload.email);

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