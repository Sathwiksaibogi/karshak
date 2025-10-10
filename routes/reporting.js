import express from 'express';
import { getFarmerDashboard, getBuyerDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/farmer/:farmerId', getFarmerDashboard);
router.get('/buyer/:buyerId', getBuyerDashboard);

export default router;


