import express from 'express';
import { createAdmin } from '../controllers/user.controller.js';
// Importe ambos os middlewares
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rota para criar um novo administrador
// Agora a rota tem uma cadeia de middlewares:
// 1º: verifyToken - Garante que o usuário está logado.
// 2º: checkRole(['admin']) - Garante que o usuário logado é um 'admin'.
// 3º: createAdmin - Se os dois acima passarem, o controller é executado.
router.post('/', verifyToken, checkRole(['admin']), createAdmin);

export default router;