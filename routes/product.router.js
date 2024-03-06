const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin')

const controllers = require('../controllers/product.controller');

router.get("/", controllers.getAllProducts);

router.get("/:id", controllers.getProductById);

router.get("/search/product/:search",controllers.productSearch);

router.post("/", admin, controllers.createProduct);

router.patch("/:id", admin, controllers.updateProduct);

router.delete("/:id", admin, controllers.deleteProduct);

router.get("/filter/products",controllers.filteredProducts);

module.exports = router;