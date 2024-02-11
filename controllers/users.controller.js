const { createUserService, findAllUsersService, findUserService, findUserBooksService } = require("../services/user.service");
const { validateNewUser, validateLogin } = require('../validation/user.validator');

const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const errorOnNull = (arg, msg) => {
    if(!arg) return res.status(401).send({message: msg});
}

const createNewUser = async (req, res)=>{
    const {name, email, password, books} = req.body;

    const {error, value} = validateNewUser(req.body);

    if(error) {
        return res.status(422).send({message: error.message});
    }

    const user = await findUserService(email);

    if(user)
    {
        return res.send({message: "This email already exists, please choose another one"});
    }

    const encryptedPass = await bcrypt.hash(password, 10);

    const newUser = await createUserService({name, email, encryptedPass, books});
    
    res.send(newUser);
}

const login = async(req,res)=>{

    const {error, value} = validateLogin(req.body);

    if(error) {
        return res.status(422).send({message: error.message});
    }

    try{
        const {email, password} = value;
        const user = await findUserService(email);

        errorOnNull(user, "Incorrect email or password...");
        
        const isValidPassword = await bcrypt.compare(password, user.encryptedPass);
        
        errorOnNull(isValidPassword, "Incorrect email or password...");

        const token = jwt.sign({email}, 'myjwtsecret', { expiresIn: '1h' });

        res.header({jwt:token}).send({token:token,email, message:"access granted"})
    }
    catch(e){
        res.status(500).send(e.message)
    }
}

const findAllUsers = async (req, res)=>{
    res.send(await findAllUsersService());
}

const getUserCourses = async (req, res)=>{
    
    try{
        const token = req.headers["jwt"];
        const email = req.headers["email"];

        errorOnNull(token);

        const payload = jwt.verify(token,"myjwtsecret");
        
        // res.send({email: payload.email, books: await findUserBooksService(payload.email)});
        res.render('index',{email: payload.email, books: await findUserBooksService(payload.email)});
    }
    catch(e){
        return res.status(401).send({message: e.message});
    }
}

module.exports = {
    createNewUser,
    login,
    findAllUsers,
    getUserCourses
}