// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // 1. CONECTA COM O ESTADO CENTRAL

const ProtectedRoute = () => {
  // 2. PERGUNTA DIRETAMENTE AO CONTEXTO SE HÁ UM USUÁRIO LOGADO.
  // Esta é a única fonte da verdade.
  const { user } = useAuth();

  // 3. Se o contexto diz que não há usuário, redireciona para o login.
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 4. Se o contexto diz que HÁ um usuário, ele renderiza a rota filha
  // que está aninhada no App.jsx (como Home, Tenants, etc.).
  return <Outlet />;
};

export default ProtectedRoute;