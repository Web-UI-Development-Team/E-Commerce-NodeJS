const express = require('express');
const router = express.Router();

const controllers = require('../controllers/edit.controller');

router.get("/", controllers.getAndUpdate);

module.exports = router;