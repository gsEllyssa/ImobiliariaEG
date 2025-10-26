import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importe o useNavigate
import api from '../services/api';

// Exporta o Context para o hook poder usar
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate(); // 2. Use o hook

  useEffect(() => {
    // Roda só uma vez para verificar se já existe uma sessão salva
    const checkUserSession = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          // Configura o token no cabeçalho do 'api' para futuras requisições
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Falha ao carregar sessão do localStorage:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        // Marca como pronto para a aplicação poder ser exibida
        setIsReady(true);
      }
    };

    checkUserSession();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login'); // 3. Redireciona para o login no logout!
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isReady,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}