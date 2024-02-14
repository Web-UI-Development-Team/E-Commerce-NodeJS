const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin')

const controllers = require('../controllers/products.controller');

router.get("/", controllers.getAllProducts);

router.get("/:id", controllers.getProductById);

router.post("/", admin, controllers.createProduct);

router.patch("/:id", admin, controllers.updateProduct);

router.delete("/:id", admin, controllers.deleteProduct);

module.exports = router;