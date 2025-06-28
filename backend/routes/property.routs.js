import express from 'express';
import { propertyController } from '../controllers/index.js';

const router = express.Router();

router.get('/', propertyController.listarImoveis);
router.post('/', propertyController.criarImovel);

export default router;
