import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/modules/Login.scss';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, senha });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuarioNome', res.data.usuario.nome);
      localStorage.setItem('usuarioEmail', res.data.usuario.email);
      localStorage.setItem('usuarioRole', res.data.usuario.role);

      console.log('✅ Login efetuado!');
      console.log('🔐 Token salvo:', res.data.token);

      // Pequeno delay para garantir persistência no localStorage
      setTimeout(() => {
        navigate('/inicio');
      }, 50);
    } catch (err) {
      console.error('❌ Erro no login:', err);
      setErro('E-mail ou senha inválidos. Tente novamente.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Insira suas credenciais de acesso nos campos abaixo:</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />

          <label htmlFor="senha">SENHA</label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            autoComplete="current-password"
          />

          {erro && <p className="login-error">{erro}</p>}

          <button type="submit" className="btn">Acessar</button>
        </form>
      </div>
    </div>
  );
}
