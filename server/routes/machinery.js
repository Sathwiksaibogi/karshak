import express from 'express';
import { createMachinery, getMachineryByFarmer, getAllMachinery, getMachineryById, updateMachinery } from '../controllers/machineryController.js';

const router = express.Router();

router.post('/', createMachinery);
router.get('/all', getAllMachinery);
router.get('/mine/:farmerId', getMachineryByFarmer);
router.get('/:id', getMachineryById);
router.patch('/:id', updateMachinery);

export default router;
