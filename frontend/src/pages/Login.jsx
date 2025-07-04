// src/pages/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/modules/Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      console.log("🔐 Tentando login com:", { email, senha });

      const res = await api.post("/auth/login", { email, senha });

      console.log("✅ Resposta do login:", res.data);

      const { token, user } = res.data;

      // Verificação de segurança
      if (!token || !user) {
        throw new Error("Resposta do servidor inválida");
      }

      // Armazenar no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("usuarioNome", user.name);
      localStorage.setItem("usuarioEmail", user.email);
      localStorage.setItem("usuarioRole", user.role || "user");

      // Redirecionar
      navigate("/inicio");
    } catch (err) {
      console.error("❌ Erro no login:", err.response?.data || err.message);
      setErro("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Insira seu e-mail e senha:</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="senha">SENHA</label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && <p className="login-error">{erro}</p>}

          <button type="submit" className="btn">Acessar</button>
        </form>
      </div>
    </div>
  );
}
