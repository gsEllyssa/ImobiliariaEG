import express from 'express';
import { getAllContracts, createContract } from '../controllers/contractController.js';

const router = express.Router();
router.get('/', getAllContracts);
router.post('/', createContract);

export default router;
