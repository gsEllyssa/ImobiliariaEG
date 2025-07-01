import express from 'express';
import { tenantController } from '../controllers/index.js';
import { proteger } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', proteger, tenantController.listTenants);
router.post('/', proteger, tenantController.createTenant);

export default router;
