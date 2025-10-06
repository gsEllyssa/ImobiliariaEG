import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // PRECISAMOS DO MODELO PARA BUSCAR O USUÁRIO

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  // ... seu código do verifyToken continua o mesmo ...
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
};

// ======================================================================
// NOVO MIDDLEWARE DE AUTORIZAÇÃO (VERIFICAÇÃO DE CARGO)
// ======================================================================
export const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      // 1. Pega o ID do usuário que foi adicionado pelo middleware 'verifyToken'
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Autenticação falhou.' });
      }

      // 2. Busca o usuário no banco de dados
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // 3. Verifica se o cargo do usuário está na lista de cargos permitidos
      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: 'Acesso negado. Permissões insuficientes.' });
      }
      
      // Se tudo estiver certo, continua para a próxima função (o controller)
      next();

    } catch (error) {
      res.status(500).json({ error: 'Erro interno na verificação de permissões.' });
    }
  };
};