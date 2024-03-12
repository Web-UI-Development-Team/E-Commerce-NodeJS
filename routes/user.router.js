const express = require("express");
const router = express.Router();

const controllers = require("../controllers/user.controller");

router.post("/register", controllers.createNewUser);

router.post("/login", controllers.login);

module.exports = router;