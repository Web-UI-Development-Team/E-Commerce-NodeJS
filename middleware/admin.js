// const User = require("../models/user.model");
// const jwt = require('jsonwebtoken');

// const returnError = (arg) => {
//     if(!arg) return res.status(401).send({message:"permission denied"});
// }

// const admin = async (req, res, next) =>{
//     try{
//         const token = sessionStorage.getItem('token');
        
//         returnError(token);
        
//         const payload = jwt.verify(token,"myjwtsecret");

//         returnError(payload.isAdmin);

//         next();
//     }
//     catch(e){
//         return res.status(401).send({message: e.message});
//     }
// }

// module.exports = admin;