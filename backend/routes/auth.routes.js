// backend/routes/auth.routes.js

import express from 'express';
// 1. IMPORTAR A FUNÇÃO 'activateAccount' JUNTO COM AS OUTRAS
import { login, register, activateAccount } from '../controllers/auth.controller.js';

const router = express.Router();

// Rota para login de usuário
router.post('/login', login);

// Rota de registro (que não usaremos no fluxo final, mas pode ficar aqui)
router.post('/register', register);

// 2. ADICIONAR A ROTA PARA ATIVAÇÃO DE CONTA
// Esta é a linha que estava faltando!
router.post('/activate-account', activateAccount);

export default router;