// backend/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave-secreta';

export const proteger = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    const usuario = jwt.verify(token, JWT_SECRET);
    req.usuario = usuario; // exemplo: req.usuario.id, req.usuario.email
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
