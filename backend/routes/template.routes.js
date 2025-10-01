import express from 'express';
import {
  listTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate
} from '../controllers/template.controller.js';
import { proteger } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Aplica segurança a todas as rotas de templates
router.use(proteger);

// Define as rotas e associa cada uma à sua função no controller
router.get('/', listTemplates);
router.get('/:id', getTemplateById);
router.post('/', createTemplate);
router.put('/:id', updateTemplate);

export default router;