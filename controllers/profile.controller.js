const services = require('../services/profile.service');
const productServices = require('../services/product.service');
const cartServices = require('../services/cart.service');

const validator = require("../validation/profile.validator");
const bycrypt = require('bcrypt');
const User = require('../models/user.model');

const getUserProfile = async (req, res) => {
    const user = req.auth;

    console.log(user);

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        imagePath: user.imagePath
    });
};

const updateUserProfile = async (req, res) => {
    try {
        const { error, value } = validator.validateUserProfile(req.body);

        if (error) {
            return res.status(422).send({ message: error.message });
        }

        const user = req.auth;

        if (req.body.password) {
            req.body.encryptedPassword = await bycrypt.hash(req.body.password, 10);
            delete req.body.password;
        }

        await services.updateUserProfileService(user.email, req.body);

        res.send(req.body);
    } catch (error) {
        res.status(500).json(error);
    }
};

const addToWishList = async (req, res) => {
    const product = req.body.product;
    const isProduct = productServices.getProductByIdService(product);
    const user = req.auth;

    if (!isProduct) {
        return res.status(404).send({ message: "product not found" });
    }

    if (user.wishList.includes(product)) {
        user.wishList.splice(user.wishList.indexOf(product), 1);
    } else {
        user.wishList.push(product);
    }

    const updateReport = services.updateWishListService(user.email, user.wishList);

    res.status(200).send(updateReport);
}

const getWishList = async (req, res) => {
    const wishList = await services.getWishListService(req.auth.email);

    res.status(200).send(wishList);
}

module.exports = {
    getUserProfile,
    updateUserProfile,
    getWishList,
    addToWishList
}