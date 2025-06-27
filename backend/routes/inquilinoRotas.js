import express from 'express';
import { listarInquilinos, criarInquilino } from '../controllers/tenantController.js';

const router = express.Router();

router.get('/', listarInquilinos);
router.post('/', criarInquilino);

export default router; // ✅ ESSENCIAL
