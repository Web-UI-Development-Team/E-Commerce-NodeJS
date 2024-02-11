const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');

const controllers = require('../controllers/admin.controller');

router.get("/users", controllers.getAllProducts);

router.get("/orders", controllers.getProductById);

router.get("/products", admin, controllers.createProduct);

router.patch("/:id", admin, controllers.updateProduct);

router.delete("/:id", admin, controllers.deleteProduct);

module.exports = router;