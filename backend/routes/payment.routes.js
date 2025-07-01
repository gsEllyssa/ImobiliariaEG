// routes/payment.routes.js

import express from 'express';
import { listPayments, createPayment } from '../controllers/payment.controller.js';
import { proteger } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/pagamentos
 * @desc    Lista todos os pagamentos realizados
 * @access  Privado (token necessário)
 */
router.get('/', proteger, listPayments);

/**
 * @route   POST /api/pagamentos
 * @desc    Registra um novo pagamento (etapa: Receber Pagamento)
 * @access  Privado (token necessário)
 */
router.post('/', proteger, createPayment);

export default router;
