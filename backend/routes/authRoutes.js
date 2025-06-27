import express from 'express';
import { loginUsuario, registrarUsuario } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUsuario);
router.post('/registrar', registrarUsuario); // opcional

export default router;
