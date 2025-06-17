import express from 'express';
import { getAllReceipts, createReceipt } from '../controllers/receiptController.js';

const router = express.Router();
router.get('/', getAllReceipts);
router.post('/', createReceipt);

export default router;
