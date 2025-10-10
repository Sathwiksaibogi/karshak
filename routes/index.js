// server/routes/index.js

import express from 'express';
import authRoutes from './auth.js';
import productRoutes from './products.js';
import orderRoutes from './orders.js';
import dashboardRoutes from './reporting.js';
import userRoutes from './users.js';
import machineryRoutes from './machinery.js';

const router = express.Router();

// Health check endpoint
router.get('/status', (req, res) => {
  res.send('API is running...');
});

// Mount the individual routers
// All routes from auth.js will be prefixed with /auth
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/reporting', dashboardRoutes);
router.use('/users', userRoutes);
router.use('/machinery', machineryRoutes);

// // All routes from products.js will be prefixed with /products
// router.use('/products', productRoutes);

// // All routes from orders.js will be prefixed with /orders
// router.use('/orders', orderRoutes);

export default router;