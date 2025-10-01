import express from 'express';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

// Define que a rota POST /login será controlada pela função 'login'
router.post('/login', login);

// Se você tiver uma rota de registro, ela viria aqui também
// router.post('/register', register);

export default router;