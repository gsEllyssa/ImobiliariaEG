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
    console.log("🔐 Enviando login...");

    try {
      const res = await api.post("/auth/login", { email, password });

      console.log("✅ Resposta do login:", res.data);
      const { user, token } = res.data;

      if (!user || !token) {
        throw new Error("Resposta do servidor inválida: Usuário ou token ausente");
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      setSuccess(true);
      console.log("🔐 Login bem-sucedido, redirecionando...");

      setTimeout(() => {
        navigate("/inicio");
      }, 1500);

    } catch (err) {
      console.error("❌ Erro no login:", err.message);
      setError(err.message || "Falha no login. Tente novamente.");
    } finally {
      setLoading(false);
      console.log("🔐 Carregamento finalizado");
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
          {success && (
            <p className="login-success">✅ Login bem-sucedido! Redirecionando...</p>
          )}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Carregando..." : "Acessar"}
          </button>
        </form>
      </div>
    </div>
  );
}
