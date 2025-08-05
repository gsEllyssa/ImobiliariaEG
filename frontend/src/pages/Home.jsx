import React from "react";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const name = user.name || "Usuário";
  const email = user.email || "sem@email.com";
  const age = user.idade || "--";

  return (
    <main className="flex-1 p-8 bg-white text-gray-800">
      {/* Filtros */}
      <form className="flex flex-wrap gap-3 mb-8">
        <input
          type="date"
          aria-label="Data"
          className="min-w-[160px] px-4 py-2 border border-gray-300 rounded-md text-sm"
        />
        <select
          aria-label="Status"
          className="min-w-[160px] px-4 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Status</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
        <select
          aria-label="Meio de Pagamento"
          className="min-w-[160px] px-4 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Meio de Pagamento</option>
          <option value="pix">Pix</option>
          <option value="boleto">Boleto</option>
          <option value="cartao">Cartão</option>
        </select>
        <select
          aria-label="Imóvel"
          className="min-w-[160px] px-4 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Imóvel</option>
          <option value="apto">Apartamento</option>
          <option value="casa">Casa</option>
        </select>
        <input
          type="text"
          placeholder="Pesquisar por nome ou imóvel"
          aria-label="Pesquisar"
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md text-sm"
        />
      </form>

      {/* Boas-vindas */}
      <section className="bg-white rounded-md shadow-sm p-6 mb-12">
        <h1 className="text-lg font-semibold mb-4">Bem-vindo(a), {name}!</h1>
        <p className="text-sm mb-2">
          <strong>Email:</strong> {email}
        </p>
        <p className="text-sm mb-2">
          <strong>Idade:</strong> {age} anos
        </p>
        <p className="text-green-600 font-medium text-sm">✅ Login efetuado com sucesso.</p>
      </section>
    </main>
  );
}
