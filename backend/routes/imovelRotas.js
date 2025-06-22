import express from 'express';
import { listarImoveis, criarImovel } from '../controllers/propertyController.js';

const router = express.Router();

router.get('/', listarImoveis);
router.post('/', criarImovel);

export default router;
