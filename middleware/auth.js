const User = require("../models/user.model");
const jwt = require('jsonwebtoken');

const errorOnNull = (arg) => {
    if(!arg) return res.status(401).send({message:"unauthorized user"});
}

const auth = async (req, res, next) =>{
    try{
        const token = sessionStorage.getItem('token');

        errorOnNull(token);

        const payload = jwt.verify(token,"myjwtsecret");

        const user = await User.findOne({email: payload.email});
        
        errorOnNull(user);

        next();
    }
    catch(e){
        return res.status(401).send({message: e.message});
    }
}

module.exports = auth;