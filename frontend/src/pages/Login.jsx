// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/modules/Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("🔼 Enviando dados:", { email, password });

    try {
      const res = await api.post("/auth/login", { email, password });

      console.log("🔽 RESPOSTA RECEBIDA:", res);
      console.log("📦 res.data:", res.data);

      const token = res.data?.token;
      const user = res.data?.user;

      if (!user || !token) {
        console.warn("❌ Token ou user ausente!");
        setError("Login inválido ou resposta incorreta do servidor");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      console.log("✅ Token salvo:", token);
      setSuccess(true);
      navigate("/inicio", { replace: true });
    } catch (err) {
      console.error("❌ Erro no login:", err);
      setError("Usuário ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Digite seu e-mail e senha:</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <label htmlFor="password">SENHA</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && <p className="login-error">{error}</p>}
          {success && <p className="login-success">✅ Login bem-sucedido!</p>}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Carregando..." : "Acessar"}
          </button>
        </form>
      </div>
    </div>
  );
}
