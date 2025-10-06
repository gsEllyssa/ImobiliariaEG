import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    // Vamos usar a variável de ambiente diretamente aqui para garantir
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    
    return res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
};

// ... a função checkRole continua a mesma
export const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Autenticação falhou.' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      
      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: 'Acesso negado. Permissões insuficientes.' });
      }
      
      next();

    } catch (error) {
      res.status(500).json({ error: 'Erro interno na verificação de permissões.' });
    }
  };
};