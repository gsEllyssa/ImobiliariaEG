// routes/payment.routes.js

import express from 'express';
import { listPayments, createPayment } from '../controllers/payment.controller.js';
import { proteger } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Aplica o middleware "proteger" a TODAS as rotas definidas abaixo neste arquivo.
// Desta forma, você não precisa repetir "proteger" em cada uma.
router.use(proteger);

/**
 * @route   GET /api/pagamentos
 * @desc    Lista todos os pagamentos realizados
 * @access  Privado (token necessário)
 */
router.get('/', listPayments);

/**
 * @route   POST /api/pagamentos
 * @desc    Registra um novo pagamento (etapa: Receber Pagamento)
 * @access  Privado (token necessário)
 */
router.post('/', createPayment);

export default router;