const User = require("../models/user.model");

const createUserService = async (user)=>{
    try{
        return await User.create(user);
    } catch(e) {
        console.log(e);
    }
};

const findAllUsersService = async ()=>{
    try{
        return await User.find();
    } catch(e) {
        console.log(e);
    }
}

const findUserService = async (email)=>{
    try{
        return await User.findOne({email});
    } catch(e) {
        console.log(e);
    }
}

const findUserBooksService = async (email)=>{
    try{
        return await User.findOne({email}).populate('books');
    } catch(e) {
        console.log(e);
    }
}

// Session Express

module.exports = {
    createUserService,
    findAllUsersService,
    findUserService,
    findUserBooksService
}