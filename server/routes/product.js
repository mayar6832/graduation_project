const router=require('express').Router();
const { model } = require('mongoose');
//imoprt product model
const product=require('../models/products');
//import controller
const products=require('../controllers/product')


router.post('/search_product',products.searchProduct)
router.post('/search_category',products.searchCategory)
//export router
module.exports=router;
