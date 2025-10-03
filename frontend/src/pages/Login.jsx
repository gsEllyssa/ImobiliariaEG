// frontend/src/pages/Login.jsx (VERSÃO REATORADA)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import FormField from "@/components/FormField"; // Usando o alias para importar o novo componente

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
    };
    const token = "token-fake-dev";
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    navigate("/home", { replace: true });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Login</h2>
        <p className={styles.subtitle}>Digite seu e-mail e senha:</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormField
            label="E-mail"
            id="email"
            type="email"
            placeholder="Digite seu e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <FormField
            label="Senha"
            id="password"
            type="password"
            placeholder="Digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? "Carregando..." : "Acessar"}
          </button>
        </form>
      </div>
    </div>
  );
}