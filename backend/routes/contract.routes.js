import express from 'express';
// Importa as funções DIRETAMENTE do controller específico
import { 
  listContracts, 
  createContract, 
  getContractById, 
  updateContract 
} from '../controllers/contract.controller.js';
// Importa o middleware de segurança
import { proteger } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Aplica o middleware "proteger" a todas as rotas deste arquivo
router.use(proteger);

// As chamadas agora são diretas e mais limpas
router.get('/', listContracts);
router.post('/', createContract);
router.get('/:id', getContractById);
router.put('/:id', updateContract);

export default router;