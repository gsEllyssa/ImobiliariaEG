import React from 'react';
import '@/styles/modules/Login.scss';

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Insira suas credenciais de acesso nos campos abaixo:</p>
        <form>
          <label htmlFor="email">E-MAIL</label>
          <input type="email" id="email" placeholder="Digite seu e-mail..." />

          <label htmlFor="senha">SENHA</label>
          <input type="password" id="senha" placeholder="Digite sua senha..." />

          <a href="#" className="forgot-link">Esqueci minha senha.</a>

          <button type="submit" className="btn btn-block">Acessar</button>
        </form>
      </div>
    </div>
  );
}
