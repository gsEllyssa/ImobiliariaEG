import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import { Navigate } from "react-router-dom"; 

export default function Login() {
  const { login, isAuthenticated, isReady } = useAuth(); 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirecionamento imediato se o usuário já estiver autenticado e a verificação terminou
  if (isReady && isAuthenticated) {
    return <Navigate to="/home" replace />; 
  }

  // Tela de carregamento enquanto a sessão está sendo verificada
  if (!isReady) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Preparando o acesso...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Usa a instância API segura para enviar as credenciais
      // O endpoint é /users/login (montado como /api/users no backend)
      const response = await api.post("/users/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Chama a função centralizada do Context
      login(user, token); 
      
    } catch (err) {
      // Trata erros de requisição (ex: 401 Unauthorized do servidor)
      const errorMessage = err.response?.data?.message || "E-mail ou senha inválidos. Tente novamente.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter">
      <div className="bg-white p-8 md:p-14 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Imobiliária</h2>
        <p className="text-sm text-blue-600 font-semibold text-center mb-8">Acesso ao Sistema de Gestão</p>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-gray-700 block mb-1">
              E-MAIL
            </label>
            <input
              type="email"
              id="email"
              placeholder="seu.usuario@imobiliaria.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-gray-700 block mb-1">
              SENHA
            </label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha de acesso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-6 text-base font-bold rounded-lg transition-colors shadow-lg ${
              loading
                ? "bg-blue-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/50"
            }`}
          >
            {loading ? "Verificando Credenciais..." : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
