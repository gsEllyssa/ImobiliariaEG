import express from 'express';
import { listarPagamentos, criarPagamento } from '../controllers/paymentController.js';

const router = express.Router();

router.get('/', listarPagamentos);
router.post('/', criarPagamento);

export default router;
