import express from "express";
import productController from "../controllers/product.js";

const router = express.Router();

router.post('/search_product', productController.searchProduct);
router.post('/search_category', productController.searchCategory);

//export router
export default router;