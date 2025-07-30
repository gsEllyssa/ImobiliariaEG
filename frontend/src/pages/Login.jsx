import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/modules/Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      name: "Dev Usuário",
      email: email || "teste@dev.com",
      idade: 25,
      role: "admin",
    };

    const token = "token-fake-dev";

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    console.log("🔐 Login liberado no modo DEV");
    navigate("/home", { replace: true }); // ✅ Rota padronizada
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
          />

          <label htmlFor="password">SENHA</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Carregando..." : "Acessar"}
          </button>
        </form>
      </div>
    </div>
  );
}
