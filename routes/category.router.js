const express = require("express");
const router = express.Router();

const controllers = require("../controllers/category.controller");
const admin = require("../middleware/admin.middleware");

const { uploadCatIcon, resizeImage } = require("../middleware/category-icon.middleware")


router
  .route("/")
  .get(controllers.gellAllCategories)
  .post(admin, uploadCatIcon, resizeImage, controllers.createCategory);

router.route("/:id/products").get(controllers.getProductsByCategory);

router.get("/filter/categories", controllers.filteredCategories);

router.patch("/:id", admin, controllers.updateCategory);

router.get("/:id", admin, controllers.getCategoryById);

module.exports = router;
