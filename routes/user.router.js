const express = require("express");
const router = express.Router();

const controllers = require("../controllers/user.controller");
const admin = require("../middleware/admin.middleware");
const paginate = require("../middleware/pagination.middleware");

const multer = require('multer');
var upload=multer({dest:"uploads/"});

router.get("/", admin, paginate(1), controllers.getAllUsers);

router.get("/:id", admin, controllers.getUserById);

router.get("/search/user/:search", admin, controllers.userSearch);

router.patch("/:id", admin, controllers.updateUser);

router.delete("/:id", admin, controllers.deleteUser);

router.post("/register", controllers.createNewUser);

router.post("/login", controllers.login);

router.post("/image", upload.single('file'), controllers.uploadImage);

module.exports = router;
