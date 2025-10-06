import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api'; // Precisamos do 'api' para configurar os headers

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // NOVO: Estado para controlar o carregamento inicial da sessão
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // A lógica foi melhorada para garantir que 'isReady' seja atualizado
    const checkUserSession = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          // Se encontramos um usuário e token, configuramos o header do api
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        // Se der qualquer erro (ex: JSON inválido), limpamos tudo por segurança
        console.error("Falha ao carregar sessão do localStorage:", error);
        logout();
      } finally {
        // NOVO E CRUCIAL: Ao final de tudo (sucesso ou falha), marcamos como pronto
        setIsReady(true);
      }
    };

    checkUserSession();
  }, []); // Roda apenas uma vez quando o componente é montado

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    // NOVO: Configura o token no header do 'api' no momento do login
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // NOVO: Remove o token do header do 'api' no momento do logout
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // NOVO: Uma forma fácil de verificar se o usuário está autenticado
  const isAuthenticated = !!user;

  // NOVO: Disponibilizamos os novos estados para os componentes
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

// Hook personalizado não precisa de alteração
export function useAuth() {
  return useContext(AuthContext);
}