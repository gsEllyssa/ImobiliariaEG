import express from 'express';
import { tenantController } from '../controllers/index.js';

const router = express.Router();

router.get('/', tenantController.listarInquilinos);
router.post('/', tenantController.criarInquilino);

export default router;
