import express from 'express';
import { listarPayments, criarPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.get('/', listarPayments);
router.post('/', criarPayment);

export default router;
