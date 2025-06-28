import express from 'express';
import { paymentController } from '../controllers/index.js';
import { proteger } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', proteger, paymentController.listarPayments);
router.post('/', proteger, paymentController.criarPayment);

export default router;
