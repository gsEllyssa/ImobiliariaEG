import express from 'express';
import { receiptController } from '../controllers/index.js';

const router = express.Router();

router.get('/', receiptController.listReceipts);
router.post('/', receiptController.createReceipt);

export default router;
