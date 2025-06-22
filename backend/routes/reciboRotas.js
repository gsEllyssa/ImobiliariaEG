import express from 'express';
import { listarRecibos, criarRecibo } from '../controllers/receiptController.js';

const router = express.Router();

router.get('/', listarRecibos);
router.post('/', criarRecibo);

export default router;
