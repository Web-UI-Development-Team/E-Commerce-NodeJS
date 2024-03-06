const express = require('express');
const router = express.Router();

const controllers = require('../controllers/reviewAndRate.controller'); 

router.route('/:id/reviews').post(controllers.addreview ).get(controllers.gellReviews);
router.post('/:id/ratings',controllers.addrating) ; 

module.exports = router;