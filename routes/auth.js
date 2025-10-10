// server/routes/auth.js

import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Define the POST routes for registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;