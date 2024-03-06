const express = require('express');
const router = express.Router();

const controllers = require('../controllers/rating.controller');

router.post('/:id/ratings', controllers.addrating);

module.exports = router;