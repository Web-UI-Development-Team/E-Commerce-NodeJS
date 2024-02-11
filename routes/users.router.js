const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users.controller');

router.get("/", controllers.findAllUsers);

router.post("/", controllers.createNewUser);

router.post("/login", controllers.login);

router.get("/books", controllers.getUserCourses);

module.exports = router;