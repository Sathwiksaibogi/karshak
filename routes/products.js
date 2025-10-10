import express from 'express';
import { createProduct, getProductsByFarmer, updateProduct, getProductsByCategory, getProductById, listProductNames } from '../controllers/productController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/mine/:farmerId', getProductsByFarmer);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.patch('/:id', updateProduct);
router.get('/', listProductNames);

export default router;


