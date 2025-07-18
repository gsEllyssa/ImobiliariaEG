import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/modules/Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      console.log("🔐 Tentando login com:", { email, senha });

      const res = await api.post("/auth/login", {
        email,
        password: senha,
      });

      console.log("✅ Resposta do login:", res.data);

      const { usuario, token, message } = res.data;

      if (!usuario || !token) {
        throw new Error("Resposta do servidor inválida");
      }

      // ✅ Armazenar dados no localStorage
      localStorage.setItem("usuarioNome", usuario.name);
      localStorage.setItem("usuarioEmail", usuario.email);
      localStorage.setItem("usuarioIdade", usuario.idade);
      localStorage.setItem("token", token);

      // ✅ Mostrar mensagem de sucesso
      setSucesso(true);
      setTimeout(() => {
        navigate("/inicio");
      }, 1500); // Redireciona após 1.5s

    } catch (err) {
      console.error("❌ Erro no login:", err.response?.data || err.message);
      setErro("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
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
          {sucesso && <p className="login-success">✅ Login realizado com sucesso!</p>}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Carregando..." : "Acessar"}
          </button>
        </form>
      </div>
    </div>
  );
}
