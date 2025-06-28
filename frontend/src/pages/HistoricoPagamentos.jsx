import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Topbar from '../components/Topbar';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

import '../styles/modules/HistoricoPagamentos.scss';

export default function HistoricoPagamentos() {
  const [pagamentos, setPagamentos] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const response = await axios.get('/api/payments');
        setPagamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pagamentos:', error);
      }
    }
    carregar();
  }, []);

  const filtrados = pagamentos.filter((p) =>
    p.tenant?.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Layout>
      <Topbar
        icon={faFileInvoiceDollar}
        title="Histórico de Pagamentos"
        subtitle="Todos os pagamentos realizados"
      />
      <div className="historico-pagamentos">
        <input
          className="input-busca"
          type="text"
          placeholder="Buscar por inquilino"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <table className="tabela-pagamentos">
          <thead>
            <tr>
              <th>Inquilino</th>
              <th>Valor</th>
              <th>Método</th>
              <th>Data</th>
              <th>Status</th>
              <th>Recibo</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p) => (
              <tr key={p._id}>
                <td>{p.tenant?.nome || '---'}</td>
                <td>R$ {Number(p.amount).toFixed(2)}</td>
                <td>{p.method}</td>
                <td>{new Date(p.paymentDate).toLocaleDateString('pt-BR')}</td>
                <td>{p.status || 'Pago'}</td>
                <td>
                  <a href={`/recibo/${p._id}`} className="link-recibo">
                    Ver Recibo
                  </a>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan="6">Nenhum pagamento encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
