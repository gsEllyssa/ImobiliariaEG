import express from 'express';
import { listTenants, createTenant } from '../controllers/tenant.controller.js';
// CORREÇÃO: Importando a função com o nome correto 'verifyToken'
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Aplica a segurança a todas as rotas deste arquivo de uma vez
// CORREÇÃO: Usando a função com o nome correto 'verifyToken'
router.use(verifyToken);

// As rotas ficam mais limpas e agora estão protegidas
router.get('/', listTenants);
router.post('/', createTenant);

export default router;