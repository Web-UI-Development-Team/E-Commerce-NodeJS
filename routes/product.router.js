const express = require("express");
const router = express.Router();

const controllers = require("../controllers/product.controller");
const admin = require("../middleware/admin.middleware");
const paginate = require("../middleware/pagination.middleware");

const multer = require('multer');

const { uploadProductImages, resizeImages } = require("../middleware/product-images.middleware")


//router.get("/", controllers.getAllProducts);

router.get("/", controllers.getAllProducts);

router.get("/:id", controllers.getProductById);

router.get("/search/product/:search", controllers.productSearch);

router.post("/", admin, uploadProductImages, resizeImages, controllers.createProduct);

router.patch("/:id", admin, controllers.updateProduct);

router.delete("/:id", admin, controllers.deleteProduct);

router.get("/filter/products", controllers.filteredProducts);

module.exports = router;
