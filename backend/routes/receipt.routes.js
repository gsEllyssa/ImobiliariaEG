import express from 'express';
import { receiptController } from '../controllers/index.js';

const router = express.Router();

router.get('/', receiptController.listarRecibos);
router.post('/', receiptController.criarRecibo);

export default router;
