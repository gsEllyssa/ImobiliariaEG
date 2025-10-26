// backend/routes/auth.routes.js

import express from 'express';
// 1. IMPORTAR AS NOVAS FUNÇÕES DO CONTROLLER
import { 
  login, 
  register, 
  activateAccount, 
  forgotPassword, 
  resetPassword 
} from '../controllers/auth.controller.js';

const router = express.Router();

// Rota de login de usuário
router.post('/login', login);

// Rota de registro (que não usaremos no fluxo final, mas pode ficar aqui)
router.post('/register', register);

// Rota para ativar uma conta a partir de um convite
router.post('/activate-account', activateAccount);

// 2. --- ADICIONAR AS ROTAS DE RECUPERAÇÃO DE SENHA ---
//    (Estas são as linhas que estavam faltando)

// Rota para solicitar o e-mail de redefinição
router.post('/forgot-password', forgotPassword);

// Rota para enviar a nova senha com o token
// O :token na URL corresponde ao que o frontend envia (redefinir-senha/:token)
router.post('/reset-password/:token', resetPassword);

export default router;