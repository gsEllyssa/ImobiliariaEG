import React, { useEffect, useState } from 'react';
import { listarContratos } from '../services/contratoService';
import '../styles/modules/Contratos.scss';
import { Link } from 'react-router-dom';

export default function Contratos() {
  const [contratos, setContratos] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    async function carregar() {
      const dados = await listarContratos();
      setContratos(dados);
    }
    carregar();
  }, []);

  const filtrados = contratos.filter((c) => {
    const texto = `${c.locador} ${c.locatario?.nome} ${c.imovel?.descricao}`.toLowerCase();
    return texto.includes(busca.toLowerCase());
  });

  return (
    <div className="contratos-page">
      <h2>Listagem de Contratos</h2>
      <div className="barra-acoes">
        <input
          type="text"
          placeholder="Buscar por nome ou imóvel..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <Link to="/novo-contrato">
          <button>+ Novo Contrato</button>
        </Link>
      </div>
      <table className="tabela-contratos">
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
          {filtrados.map((c) => (
            <tr key={c._id}>
              <td>{c.locador}</td>
              <td>{c.locatario?.nome}</td>
              <td>{c.imovel?.descricao}</td>
              <td>{new Date(c.dataInicio).toLocaleDateString('pt-BR')}</td>
              <td>{new Date(c.dataFim).toLocaleDateString('pt-BR')}</td>
              <td>
                <Link to={`/contrato/${c._id}`}>
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
