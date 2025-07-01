import express from 'express';
import { contractController } from '../controllers/index.js';

const router = express.Router();

router.get('/', contractController.listContracts);
router.post('/', contractController.createContract);
router.get('/:id', contractController.getContractById);
router.put('/:id', contractController.updateContract);

export default router;
