import express from 'express';
import { createAdmin } from '../controllers/user.controller.js';
import { proteger } from '../middlewares/auth.middleware.js'; // Middleware de segurança

const router = express.Router();

// Rota para criar um novo administrador
// A rota está protegida, ou seja, só um admin já logado poderia criar outro.
router.post('/', proteger, createAdmin);

export default router;