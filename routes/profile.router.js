const express = require('express');
const router = express.Router();

const controllers = require('../controllers/profile.controller');

router.route('/').get(controllers.getUserProfile).patch(controllers.updateUserProfile);

router.route('/wish-list').post(controllers.addToWishList);

module.exports = router;