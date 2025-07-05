import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu.jsx';
import '../styles/modules/Inicio.scss';

export default function Inicio() {
  const nome = localStorage.getItem('usuarioNome');
  const email = localStorage.getItem('usuarioEmail');
  const idade = localStorage.getItem('usuarioIdade');

  return (
    <div className="layout-container">
      <Menu />
      <div className="content">
        <form className="filtro">
          <input type="date" />
          <select><option>Status</option></select>
          <select><option>M. Pagamento</option></select>
          <select><option>Imóvel</option></select>
          <input type="text" placeholder="Pesquisar" />
        </form>

        <section className="secao">
          <h1>Bem-vindo(a), {nome}!</h1>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Idade:</strong> {idade} anos</p>
          <p>✅ Login efetuado com sucesso.</p>
        </section>
      </div>
    </div>
  );
}
