import express from 'express';
import { userController } from '../controllers/index.js';
import { autenticar } from '../middlewares/autenticacao.js';

const router = express.Router();

router.post('/registrar', userController.registrar);
router.post('/login', userController.login);

router.get('/perfil', autenticar, (req, res) => {
  res.json({ mensagem: 'Perfil do usuário autenticado', usuario: req.usuario });
});

export default router;
