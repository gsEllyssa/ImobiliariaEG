import express from 'express';
import { contractController } from '../controllers/index.js';

const router = express.Router();

router.get('/', contractController.listarContratos);
router.post('/', contractController.criarContrato);
router.get('/:id', contractController.buscarContratoPorId);
router.put('/:id', contractController.atualizarContrato);

export default router;
