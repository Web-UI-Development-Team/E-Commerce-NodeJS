const services = require('../services/profile.service');
const jwt = require("jsonwebtoken");
const validator = require("../validation/profile.validator");

const getUserProfile = async (req, res) => {
    const token = req.headers["jwt"];

    if(!token) res.status(401).send({message: "unauthorized user"});

    const payload = jwt.verify(token, "myjwtsecret");

    const user = await services.getUserProfileService(payload.email);

    if(!user) res.status(404).send({message: "not found"});

    res.send({
        name: user.name,
        email: user.email
    });
}

const updateUserProfile = async (req, res) => {
    const { error, value } = validator.validateUserProfile(req.body);

    if (error) {
        return res.status(422).send({ message: error.message });
    }
    
    const token = req.headers["jwt"];
    
    if(!token) res.status(401).send({message: "unauthorized user"});
    
    const payload = jwt.verify(token, "myjwtsecret");

    if(!req.body.email) email = payload.email;
    else email = req.body.email;
    
    if(!req.body.name) _name = payload.name;
    else _name = req.body.name;

    await services.updateUserProfileService(payload.email, _name, email);

    res.send(req.body);
}



module.exports = {
    getUserProfile,
    updateUserProfile
}