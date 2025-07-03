import React, { useState, useEffect } from 'react';
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
      const res = await api.post('/auth/login', { email, senha });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuarioNome', res.data.user.name);
      localStorage.setItem('usuarioEmail', res.data.user.email);
      localStorage.setItem('usuarioRole', res.data.user.role);

      console.log('✅ Login efetuado!');
      navigate('/inicio');
    } catch (err) {
      console.error('❌ Erro no login:', err);
      setErro('E-mail ou senha inválidos. Tente novamente.');
    }
  };

  // ⚡ Atalho secreto: Ctrl + Shift + L (somente em dev)
  useEffect(() => {
    if (import.meta.env.MODE !== 'production') {
      const handleKeydown = async (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
          try {
            const res = await api.post('/auth/acesso-rapido');

            const user = res.data.user;

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('usuarioNome', user.name);
            localStorage.setItem('usuarioEmail', user.email);
            localStorage.setItem('usuarioRole', user.role);

            console.log('⚡ Acesso rápido ativado!');
            navigate('/inicio');
          } catch (error) {
            console.error('❌ Erro no acesso rápido:', error);
            alert('Erro ao realizar acesso rápido.');
          }
        }
      };

      window.addEventListener('keydown', handleKeydown);
      return () => window.removeEventListener('keydown', handleKeydown);
    }
  }, [navigate]);

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
