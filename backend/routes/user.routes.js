// backend/routes/user.routes.js
import express from 'express';
import { userController } from '../controllers/index.js';
import { proteger } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', userController.register); // corrigido
router.post('/login', userController.login);

router.get('/perfil', proteger, (req, res) => {
  res.json({ mensagem: 'Perfil do usuário autenticado', usuario: req.usuario });
});

export default router;
