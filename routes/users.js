import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getProfile);
router.patch('/:id', updateProfile);

export default router;


