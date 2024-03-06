const express = require('express');
const router = express.Router();

const controllers = require('../controllers/review.controller');

router.route('/:id/reviews').post(controllers.addreview).get(controllers.gellReviews);

module.exports = router;