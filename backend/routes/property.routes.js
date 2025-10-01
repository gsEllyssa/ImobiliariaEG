import express from 'express';
// 1. Importa apenas as funções necessárias, diretamente
import { listProperties, createProperty } from '../controllers/property.controller.js';
import { proteger } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 2. Aplica a segurança a todas as rotas de uma vez
router.use(proteger);

// 3. As chamadas ficam mais diretas
// GET: Listar todos os imóveis (protegido)
router.get('/', listProperties);

// POST: Criar novo imóvel (protegido)
router.post('/', createProperty);

export default router;