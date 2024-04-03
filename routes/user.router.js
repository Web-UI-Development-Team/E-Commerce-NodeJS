const express = require("express");

const router = express.Router();

const controllers = require("../controllers/user.controller");
const {uploadUserImage, resizeImage} = require("../middleware/user-profile-image.middleware")

const admin = require("../middleware/admin.middleware");
const paginate = require("../middleware/pagination.middleware");

router.get("/", admin,  controllers.getAllUsers);

router.get("/:id", admin, controllers.getUserById);

router.get("/search/user/:search", admin, controllers.userSearch);

router.patch("/:id", admin, controllers.updateUser);

router.delete("/:id", admin, controllers.deleteUser);

router.post("/register", uploadUserImage, resizeImage, controllers.createNewUser);

router.post("/login", controllers.login);

module.exports = router;