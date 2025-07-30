import React, { useEffect, useState } from 'react';
import { listContracts } from '../services/contractService';
import '../styles/modules/Contracts.scss';
import { Link } from 'react-router-dom';

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const data = await listContracts();
      setContracts(data);
    }
    load();
  }, []);

  const filtered = contracts.filter((contract) => {
    const text = `${contract.locador} ${contract.locatario?.name} ${contract.imovel?.descricao}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="contracts-page">
      <h2>Listagem de Contratos</h2>

      <div className="actions-bar">
        <input
          type="text"
          placeholder="Buscar por nome ou imóvel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/new-contract">
          <button>+ Novo Contrato</button>
        </Link>
      </div>

      <table className="contracts-table">
        <thead>
          <tr>
            <th>Locador</th>
            <th>Locatário</th>
            <th>Imóvel</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((contract) => (
            <tr key={contract._id}>
              <td>{contract.locador}</td>
              <td>{contract.locatario?.name}</td>
              <td>{contract.imovel?.descricao}</td>
              <td>{new Date(contract.dataInicio).toLocaleDateString('pt-BR')}</td>
              <td>{new Date(contract.dataFim).toLocaleDateString('pt-BR')}</td>
              <td>
                <Link to={`/contract/${contract._id}`}>
                  <button>Visualizar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
