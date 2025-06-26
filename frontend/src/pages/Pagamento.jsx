import React, { useEffect, useState } from 'react';
import removeAccents from 'remove-accents';
import '../styles/modules/Pagamento.scss';
import Menu from '../components/Menu';
import StepProgress from '../components/StepProgress';
import Topbar from '../components/Topbar';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { listarInquilinos } from '../services/inquilinoService';
import { criarPagamento } from '../services/pagamentoService';
import { criarRecibo } from '../services/reciboService';

export default function Pagamento() {
  const [etapa, setEtapa] = useState(1);
  const [inquilinos, setInquilinos] = useState([]);
  const [busca, setBusca] = useState('');
  const [selecionado, setSelecionado] = useState(null);
  const [pagamento, setPagamento] = useState(null);
  const [recibo, setRecibo] = useState(null);

  useEffect(() => {
    async function carregar() {
      const dados = await listarInquilinos();
      console.log('Inquilinos recebidos:', dados); // debug opcional
      setInquilinos(dados);
    }
    carregar();
  }, []);

  const normalizar = (texto) =>
    typeof texto === 'string'
      ? removeAccents(texto.toLowerCase().trim())
      : '';

  const filtrados = busca
    ? inquilinos.filter((i) => normalizar(i?.nome).includes(normalizar(busca)))
    : inquilinos;

  const handleReceber = async () => {
    if (!selecionado?.contrato?._id) return alert('Contrato não encontrado');

    const dadosPagamento = {
      tenantId: selecionado._id,
      contractId: selecionado.contrato._id,
      amount: selecionado.contrato.valor,
      method: 'Cash',
      paymentDate: new Date().toISOString()
    };

    const novoPagamento = await criarPagamento(dadosPagamento);
    setPagamento(novoPagamento);

    const dadosRecibo = {
      tenantId: selecionado._id,
      contractId: selecionado.contrato._id,
      propertyId: selecionado.contrato.imovel?._id,
      paymentId: novoPagamento._id,
      amount: novoPagamento.amount,
      paymentDate: novoPagamento.createdAt,
      method: novoPagamento.method,
      status: 'Paid'
    };

    const novoRecibo = await criarRecibo(dadosRecibo);
    setRecibo(novoRecibo);
    setEtapa(3);
  };

  return (
    <div className="layout-container">
      <Menu />
      <div className="page-content-area">
        <Topbar icon={faDollarSign} title="Pagamentos" subtitle="Novo Pagamento" />
        <main className="content">
          <StepProgress etapaAtual={etapa} />

          {etapa === 1 && (
            <section className="search-tenant-section">
              <input
                type="text"
                className="tenant-search"
                placeholder="Pesquisar pelo nome"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <ul className="tenant-list">
                {filtrados.length === 0 && (
                  <li className="tenant-item disabled">Nenhum inquilino encontrado</li>
                )}
                {filtrados.map((i) => (
                  <li
                    key={i._id}
                    className={`tenant-item ${selecionado?._id === i._id ? 'active' : ''}`}
                    onClick={() => {
                      setSelecionado(i);
                      setEtapa(2);
                    }}
                  >
                    <i className="far fa-clock"></i>
                    <span>{i.nome}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {etapa === 2 && selecionado?.contrato && (
            <section className="payment-summary">
              <h3>Resumo</h3>
              <p>{selecionado.contrato.imovel?.descricao || 'Imóvel'}</p>
              <p>
                Recebi de <strong>{selecionado.nome}</strong> a importância de{' '}
                <strong>R$ {Number(selecionado.contrato.valor).toFixed(2)}</strong>.
              </p>
              <p>
                Proveniente do aluguel de <br />
                {selecionado.contrato.imovel?.endereco || 'Endereço não disponível'} <br />
                Referente ao contrato ativo.{' '}
                <strong>
                  Vencimento em{' '}
                  {new Date(selecionado.contrato.vencimento).toLocaleDateString('pt-BR')}
                </strong>.
              </p>

              <div className="payment-boxes">
                <div className="box">
                  <span className="label">Método de Pagamento</span>
                  <strong>Dinheiro</strong>
                </div>
                <div className="box">
                  <span className="label">Valor Total</span>
                  <strong>R$ {Number(selecionado.contrato.valor).toFixed(2)}</strong>
                </div>
              </div>

              <div className="btn-container">
                <button className="btn-cancelar" onClick={() => setEtapa(1)}>
                  Cancelar
                </button>
                <button className="btn-receber" onClick={handleReceber}>
                  Receber
                </button>
              </div>
            </section>
          )}

          {etapa === 3 && recibo && (
            <section className="receipt-container">
              <div className="receipt-actions">
                <i className="fas fa-download" title="Download"></i>
                <i className="fas fa-print" title="Imprimir"></i>
              </div>
              <div className="receipt-content">
                <h3>Recibo de Aluguel</h3>
                <p>{selecionado.contrato.imovel?.descricao || 'Aluguel comercial'}</p>
                <p>
                  Recebi de <strong>{selecionado.nome}</strong> a importância de{' '}
                  <strong>R$ {Number(recibo.amount).toFixed(2)}</strong>.
                </p>
                <p>
                  Referente ao imóvel: <br />
                  {selecionado.contrato.imovel?.endereco || 'Endereço não disponível'} <br />
                  Vencimento em{' '}
                  <strong>
                    {new Date(selecionado.contrato.vencimento).toLocaleDateString('pt-BR')}
                  </strong>.
                </p>
                <p>Assinatura: Cleia Maria Oliveira</p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
