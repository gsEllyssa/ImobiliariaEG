import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // --- MODIFICAÇÃO TEMPORÁRIA ---
  // A linha original foi comentada para desabilitar a verificação de login.
  // const token = localStorage.getItem('token');
  // return token ? children : <Navigate to="/" replace />; 

  // Agora, sempre permite o acesso, renderizando a página filha.
  return children; 
  // --- FIM DA MODIFICAÇÃO TEMPORÁRIA ---
}