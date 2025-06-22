import express from 'express';
import { listarContratos, criarContrato } from '../controllers/contractController.js';

const router = express.Router();

router.get('/', listarContratos);
router.post('/', criarContrato);

export default router;
