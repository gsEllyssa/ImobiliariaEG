import express from 'express';
import { propertyController } from '../controllers/index.js';
import { proteger } from '../middlewares/auth.middleware.js';

const router = express.Router();

// GET: Listar todos os imóveis (protegido)
router.get('/', proteger, propertyController.listarImoveis);

// POST: Criar novo imóvel (protegido)
router.post('/', proteger, propertyController.criarImovel);

export default router;
