import React, { createContext, useEffect, useState } from 'react';
import api from '../services/api';

// Exporta o Context para o hook poder usar
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false); // Controla o carregamento inicial

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
        logout(); // Limpa se houver erro
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