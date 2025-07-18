import React from 'react';
import '../styles/modules/Inicio.scss';

export default function Inicio() {
  const nome = localStorage.getItem('usuarioNome') || 'Usuário';
  const email = localStorage.getItem('usuarioEmail') || 'sem@email.com';
  const idade = localStorage.getItem('usuarioIdade') || '--';

  return (
    <main className="content">
      <form className="filtro">
        <input type="date" aria-label="Data" />
        <select aria-label="Status">
          <option value="">Status</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
        <select aria-label="Meio de Pagamento">
          <option value="">Meio de Pagamento</option>
          <option value="pix">Pix</option>
          <option value="boleto">Boleto</option>
          <option value="cartao">Cartão</option>
        </select>
        <select aria-label="Imóvel">
          <option value="">Imóvel</option>
          <option value="apto">Apartamento</option>
          <option value="casa">Casa</option>
        </select>
        <input type="text" placeholder="Pesquisar por nome ou imóvel" aria-label="Pesquisar" />
      </form>

      <section className="secao">
        <h1>Bem-vindo(a), {nome}!</h1>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Idade:</strong> {idade} anos</p>
        <p className="sucesso">✅ Login efetuado com sucesso.</p>
      </section>
    </main>
  );
}
