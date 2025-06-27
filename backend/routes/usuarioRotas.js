import express from 'express';
import { registrar, login } from '../controllers/usuarioController.js';
import { autenticar } from '../middlewares/autenticacao.js'; // import do middleware

const router = express.Router();

router.post('/registrar', registrar);
router.post('/login', login);

// rota protegida como exemplo:
router.get('/perfil', autenticar, (req, res) => {
  res.json({ mensagem: 'Perfil do usuário autenticado', usuario: req.usuario });
});

export default router;
