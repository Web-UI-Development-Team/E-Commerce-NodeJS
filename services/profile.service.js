const Profile = require("../models/user.model")

const getUserProfileService = async (email) => {
    try {
        return await Profile.findOne({ email });
    }
    catch (error) {
        console.log(error);
    }
}

const updateUserProfileService = async (oldEmail, name, newEmail, newPassword) => {
    try {
        return await Profile.updateOne({ email: oldEmail }, { name:name, email: newEmail,encryptedPassword: newPassword });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUserProfileService,
    updateUserProfileService
}