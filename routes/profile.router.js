const express = require('express');
const router = express.Router();

const controllers = require('../controllers/profile.controller');

const {uploadUserImage, resizeImage} = require("../middleware/user-profile-image.middleware")

router.route('/').get(controllers.getUserProfile).patch(uploadUserImage, resizeImage, controllers.updateUserProfile);

router.route('/wish-list').post(controllers.addToWishList).get(controllers.getWishList);

module.exports = router;