const Profile = require("../models/user.model")

const getUserProfileService = async (email) => {
    try {
        return await Profile.findOne({ email });
    }
    catch (error) {
        console.log(error);
    }
}

const updateUserProfileService = async (email, body) => {
    try {
        return await Profile.updateOne({ email }, body);
    }
    catch (error) {
        console.log(error);
    }
}

const getWishListService = async (email) => {
    try {
        return await Profile.findOne({ email }, {wishList: 1, _id:0}).populate("wishList");
    }
    catch (error) {
        console.log(error);
    }
}

const updateWishListService = async (email, wishList) => {
    try {
        return await Profile.updateOne({ email }, { wishList });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUserProfileService,
    updateUserProfileService,
    getWishListService,
    updateWishListService
}