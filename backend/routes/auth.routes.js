import express from 'express';
// MELHORIA 1: Importar a função 'register' que já criamos
import { login, register } from '../controllers/auth.controller.js';

const router = express.Router();

// Define que a rota POST /login será controlada pela função 'login'
// Rota para validar credenciais e retornar um Token JWT
router.post('/login', login);

// MELHORIA 2: Ativar a rota de registro, que já está pronta no controller
// Rota para criar um novo usuário
router.post('/register', register);

export default router;