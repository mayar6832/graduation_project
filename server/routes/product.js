import express from "express";
import productController from "../controllers/product.js";

const router = express.Router();

router.post('/search_product', productController.searchProduct);
router.post('/search_category', productController.searchCategory);
router.post('/:id',productController.getProduct) ;
router.put('/:id/fav',productController.favProduct);
router.put('/:id/alert',productController.alertProduct);
router.post('/:id/rev',productController.revProduct);
//export router
export default router;