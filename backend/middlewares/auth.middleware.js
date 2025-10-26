// backend/middlewares/auth.middleware.js

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Middleware 1: Verificar Token e Anexar o Usuário à Requisição
export const verifyToken = async (req, res, next) => {
  let token;

  // O token vem no header no formato 'Bearer TOKEN'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Extrair o token
      token = req.headers.authorization.split(' ')[1];

      // 2. Verificar o token usando o segredo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Buscar o usuário pelo ID do token e ANEXAR O OBJETO COMPLETO DO USUÁRIO
      //    (sem a senha) ao objeto 'req'. Esta é a otimização!
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'Usuário pertencente a este token não existe mais.' });
      }

      // 4. Tudo certo, passar para o próximo middleware ou controller
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido ou expirado. Faça o login novamente.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }
};


// Middleware 2: Verificar se o Usuário tem a Permissão Necessária
export const checkRole = (roles) => {
  // 'roles' será um array, ex: ['admin']
  return (req, res, next) => {
    // Graças ao 'verifyToken', já temos 'req.user' disponível aqui.
    // AGORA NÃO PRECISA MAIS BUSCAR NO BANCO!
    if (!req.user || !roles.includes(req.user.role)) {
      // Se não houver usuário ou a 'role' dele não estiver na lista de permissões
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para realizar esta ação.' });
    }

    // Permissão OK, pode continuar
    next();
  };
};