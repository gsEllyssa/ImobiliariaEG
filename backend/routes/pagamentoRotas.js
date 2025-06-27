import express from 'express';
import { listarPayments, criarPayment } from '../controllers/paymentController.js';
import { proteger } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', proteger, listarPayments);
router.post('/', proteger, criarPayment);

export default router;
