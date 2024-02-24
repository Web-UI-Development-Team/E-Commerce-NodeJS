const services = require('../services/profile.service');
const jwt = require("jsonwebtoken");
const validator = require("../validation/profile.validator");
const bycrypt = require('bcrypt');
const User = require('../models/user.model');

const getUserProfile = async (req, res) => {
    const token = req.headers["jwt"];

    if (!token) res.status(401).send({ message: "unauthorized user" });

    const payload = jwt.verify(token, "myjwtsecret");

    const user = await services.getUserProfileService(payload.email);

    if (!user) res.status(404).send({ message: "not found" });

    res.send({
        name: user.name,
        email: user.email
    });
}
const updateUserProfile = async (req, res) => {
    let _name, email;
    try {
        const { error, value } = validator.validateUserProfile(req.body);

        if (error) {
            return res.status(422).send({ message: error.message });
        }

        const token = req.headers["jwt"];

        if (!token) res.status(401).send({ message: "unauthorized user" });

        const payload = jwt.verify(token, "myjwtsecret");

        const user = await services.getUserProfileService(payload.email);

        if (!req.body.email) email = user.email;
        else email = req.body.email;

        if (!req.body.name) _name = user.name;
        else _name = req.body.name;

       
        
        const Password = req.body.password || user.encryptedPassword;
        console.log(Password);
        
        const encryptedPassword = await bycrypt.hash(Password, 10);
        console.log(encryptedPassword);

        await services.updateUserProfileService(payload.email, _name, email, encryptedPassword);

        res.send(req.body);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
};



module.exports = {
    getUserProfile,
    updateUserProfile
}