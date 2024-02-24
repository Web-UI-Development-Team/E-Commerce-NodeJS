const express = require('express');

const {createCategory, gellAllCategory,getProductsByCategory, filteredCategories } = require('../controllers/category.controller'); 
const router = express.Router();  

router.route('/').get(gellAllCategory).post(createCategory) ;
router.route('/:id/products').get(getProductsByCategory);
router.get("/filter/categories",filteredCategories)
module.exports = router; 
