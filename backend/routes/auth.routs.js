import express from 'express';
import { authController } from '../controllers/index.js';

const router = express.Router();

router.post('/login', authController.loginUsuario);
router.post('/registrar', authController.registrarUsuario);

export default router;
