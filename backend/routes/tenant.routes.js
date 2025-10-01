import express from 'express';
import { listTenants, createTenant } from '../controllers/tenant.controller.js';
import { proteger } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Aplica a segurança a todas as rotas deste arquivo de uma vez
router.use(proteger);

// As rotas ficam mais limpas
router.get('/', listTenants);
router.post('/', createTenant);

export default router;