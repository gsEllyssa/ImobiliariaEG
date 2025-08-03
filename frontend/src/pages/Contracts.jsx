import React, { useEffect, useState } from 'react';
import { listContracts } from '../services/contractService';
import { Link } from 'react-router-dom';
import '../styles/modules/Contracts.scss';

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
    const text = `${contract.nome} ${contract.locatario?.name} ${contract.imovel?.descricao}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="contracts-page">
      <div className="contracts-header">
        <div className="contracts-title-group">
          <h2>Gestão de contratos</h2>
          <p className="subtitle">Visualize e gerencie todos os contratos cadastrados</p>
        </div>

        <div className="contracts-actions">
          <input
            type="text"
            placeholder="🔍 Nome, CPF, RG, E-mail, cód. imóvel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="buttons-group">
            <Link to="/new-contract">
              <button className="btn btn-primary">Criar novo contrato</button>
            </Link>
            <Link to="/contract-templates">
              <button className="btn btn-secondary">Modelos de contrato</button>
            </Link>
          </div>
        </div>
      </div>

      <table className="contracts-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Inquilino</th>
            <th>Última modificação</th>
            <th>Tamanho do arquivo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((contract) => (
            <tr key={contract._id}>
              <td>{contract.nome}</td>
              <td>{contract.locatario?.name}</td>
              <td>{new Date(contract.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
              <td>200KB</td>
              <td>
                <Link to={`/contract/${contract._id}`}>
                  <button className="btn btn-light">...</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
