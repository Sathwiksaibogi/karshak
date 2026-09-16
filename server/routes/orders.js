import express from 'express';
import { createOrder, getFarmerOrders, updateOrderStatus, getBuyerOrders, deleteBuyerOrder, deleteDeliveredOrder } from '../controllers/orderController.js';

const router = express.Router();

// buyer creates order after payment
router.post('/', createOrder);

// farmer views their orders
router.get('/farmer/:farmerId', getFarmerOrders);

// farmer updates status of an order
router.patch('/:orderId/status', updateOrderStatus);

// buyer views own orders
router.get('/buyer/:buyerId', getBuyerOrders);

// buyer removes an order
router.delete('/:orderId', deleteBuyerOrder);

// farmer deletes a delivered order
router.delete('/:orderId/delivered', deleteDeliveredOrder);

export default router;


