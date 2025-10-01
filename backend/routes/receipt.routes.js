import express from 'express';
// 1. Importa as funções diretamente do controller
import { listReceipts, createReceipt } from '../controllers/receipt.controller.js';
// 2. Importa o middleware de segurança
import { proteger } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 3. Aplica a segurança a todas as rotas deste arquivo
router.use(proteger);

// 4. As chamadas ficam mais diretas
router.get('/', listReceipts);
router.post('/', createReceipt);

export default router;