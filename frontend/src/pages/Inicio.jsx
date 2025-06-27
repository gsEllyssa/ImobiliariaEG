import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu.jsx';
import api from '../services/api';
import '../styles/modules/Inicio.scss';

export default function Inicio() {
  const [pagamentos, setPagamentos] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const token = localStorage.getItem('token');
        const resposta = await api.get('/pagamentos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPagamentos(resposta.data);
      } catch (erro) {
        console.error('Erro ao buscar pagamentos:', erro);
      }
    };
    carregar();
  }, []);

  const formatarData = (data) => {
    if (!data) return '';
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR') + ', ' + d.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status) => {
    if (status === 'Paid') return <><i className="fa-solid fa-circle-check text-green" /> <span>Aprovada</span></>;
    if (status === 'Pending') return <><i className="fa-solid fa-clock text-yellow" /> <span>Pendente</span></>;
    return <><i className="fa-solid fa-circle-minus text-red" /> <span>Vencido</span></>;
  };

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
          <h1>Pagamentos</h1>
          <table className="tabela">
            <thead>
              <tr>
                <th></th>
                <th>NOME</th>
                <th>STATUS</th>
                <th>VALOR</th>
                <th>M. PAGAMENTO</th>
                <th>DATA</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pagamentos.map((p) => (
                <tr key={p._id}>
                  <td><input type="checkbox" /></td>
                  <td>{p.tenantId?.nome || '---'}</td>
                  <td>{getStatusLabel(p.status)}</td>
                  <td>{p.amount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}</td>
                  <td>{p.method}</td>
                  <td>{formatarData(p.paymentDate)}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
