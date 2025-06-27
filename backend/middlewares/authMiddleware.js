// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export const proteger = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, 'segredo_super_seguro');
    req.usuario = decoded; // Adiciona os dados do usuário no request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
