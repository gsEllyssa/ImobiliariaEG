import React from "react";
import "../styles/modules/Home.scss";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const name = user.name || "Usuário";
  const email = user.email || "sem@email.com";
  const age = user.idade || "--";

  return (
    <main className="content">
      <form className="filters">
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
        <input
          type="text"
          placeholder="Pesquisar por nome ou imóvel"
          aria-label="Pesquisar"
        />
      </form>

      <section className="welcome">
        <h1>Bem-vindo(a), {name}!</h1>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Idade:</strong> {age} anos
        </p>
        <p className="success">✅ Login efetuado com sucesso.</p>
      </section>
    </main>
  );
}
