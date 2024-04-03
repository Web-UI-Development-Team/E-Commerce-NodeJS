const express = require('express');
const router = express.Router();

const controllers = require('../controllers/review.controller');

router.route('/:id/reviews').post(controllers.addreview).get(controllers.getReviews).delete(controllers.deleteReview).patch(controllers.updateReview);
router.route('/:id/reviews/user').get(controllers.isReviewed);

module.exports = router;