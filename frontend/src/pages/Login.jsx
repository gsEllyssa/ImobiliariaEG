import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/modules/Login.scss';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/inicio');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Insira suas credenciais de acesso nos campos abaixo:</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL</label>
          <input type="email" id="email" placeholder="Digite seu e-mail..." required />
          <label htmlFor="senha">SENHA</label>
          <input type="password" id="senha" placeholder="Digite sua senha..." required />
          <a href="#" className="forgot-link">Esqueci minha senha.</a>
          <button type="submit" className="btn">Acessar</button>
        </form>
      </div>
    </div>
  );
}
