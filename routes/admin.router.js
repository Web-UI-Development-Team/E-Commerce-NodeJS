const express = require('express');
const router = express.Router();

const controllers = require('../controllers/admin.controller');

router.get("/users", controllers.getAllUsers);

// router.get("/orders", controllers.getAllOrders);

router.get("/products", controllers.getAllProducts);

// router.get("/categories", controllers.getAllCategories);

module.exports = router;