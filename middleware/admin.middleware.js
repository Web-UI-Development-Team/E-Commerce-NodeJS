const User = require("../models/user.model");
const jwt = require('jsonwebtoken');

const admin = async (req, res, next) =>{
    try{
        const token = req.headers["jwt"];
        
        if(!token) return res.status(401).send({message:"permission denied"});
        
        const payload = jwt.verify(token,"myjwtsecret");
        
        const user = await User.findOne({ email: payload.email });

        if(!user.isAdmin) return res.status(401).send({message:"permission denied"});

        next();
    }
    catch(e){
        return res.status(401).send({message: e.message});
    }
}

module.exports = admin;