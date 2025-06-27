import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave-secreta';

export function autenticar(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const usuario = jwt.verify(token, JWT_SECRET);
    req.usuario = usuario; // aqui você acessa req.usuario.id, req.usuario.tipo, etc.
    next();
  } catch (error) {
    res.status(401).json({ erro: 'Token inválido' });
  }
}
