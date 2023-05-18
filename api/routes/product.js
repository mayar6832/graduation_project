import express from 'express';
import { createProduct, getProduct, revProduct,favProduct ,alertProduct} from '../controllers/products.js';


const router = express.Router();
router.get('/:id',getProduct) ;
router.post('/',createProduct) ;
router.put('/:id/fav',favProduct)
router.put('/:id/alert',alertProduct)
// router.get('/:id',getProduct);
// router.patch('/:id/fav',auth ,favProduct);
router.post('/:id/rev', revProduct);
export default router;