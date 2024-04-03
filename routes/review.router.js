const express = require('express');
const router = express.Router();

const controllers = require('../controllers/review.controller');

const auth = require("../middleware/auth.middleware");

router.route('/:id/reviews').get(controllers.getReviews);
router.route('/:id/reviews', auth).post(auth, controllers.addreview).delete(auth, controllers.deleteReview).patch(auth, controllers.updateReview);
router.route('/:id/reviews/user').get(auth, controllers.isReviewed);

module.exports = router;