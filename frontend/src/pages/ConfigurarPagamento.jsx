import React, { useState } from 'react';
import Menu from '../components/Menu';
import Topbar from '../components/Topbar';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import '../styles/modules/Pagamento.scss';

export default function ConfigurarPagamento() {
  const [etapa, setEtapa] = useState(1);
  const [inquilinoSelecionado, setInquilinoSelecionado] = useState(null);

  const avancar = () => setEtapa((e) => e + 1);
  const voltar = () => setEtapa((e) => e - 1);

  const inquilinosFake = [
    { id: 1, nome: 'João Silva' },
    { id: 2, nome: 'Maria Oliveira' },
    { id: 3, nome: 'Pedro Souza' },
  ];

  return (
    <div className="layout-container">
      <Menu />
      <div className="page-content-area">
        <Topbar
          icon={faCreditCard}
          title="Receber Pagamento"
          subtitle="Etapas de confirmação"
        />

        <main className="content">
          {/* Indicador de Etapas */}
          <div className="step-progress">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`step-wrapper ${etapa === n ? 'current' : etapa > n ? 'completed' : ''}`}
              >
                <div className="circle">{etapa > n ? '✓' : ''}</div>
                {n < 3 && (
                  <div className={`line ${etapa > n ? 'completed' : ''}`}></div>
                )}
                <div className="label">
                  {n === 1 ? 'Selecionar Inquilino' : n === 2 ? 'Confirmar Pagamento' : 'Recibo'}
                </div>
              </div>
            ))}
          </div>

          {/* Etapa 1: Seleção de inquilino */}
          {etapa === 1 && (
            <section className="search-tenant-section">
              <input
                type="text"
                className="tenant-search"
                placeholder="Buscar inquilino..."
              />
              <ul className="tenant-list">
                {inquilinosFake.map((i) => (
                  <li
                    key={i.id}
                    className={`tenant-item ${inquilinoSelecionado?.id === i.id ? 'active' : ''}`}
                    onClick={() => setInquilinoSelecionado(i)}
                  >
                    <i className="fa fa-user"></i>
                    {i.nome}
                  </li>
                ))}
              </ul>
              <div className="btn-container">
                <button
                  className="btn-receber"
                  onClick={avancar}
                  disabled={!inquilinoSelecionado}
                >
                  Próximo
                </button>
              </div>
            </section>
          )}

          {/* Etapa 2: Resumo */}
          {etapa === 2 && (
            <section className="payment-summary">
              <h3>Resumo do Pagamento</h3>
              <p><strong>Inquilino:</strong> {inquilinoSelecionado?.nome}</p>
              <p><strong>Valor:</strong> R$ 1.200,00</p>
              <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>

              <div className="btn-container">
                <button className="btn-cancelar" onClick={voltar}>Voltar</button>
                <button className="btn-receber" onClick={avancar}>Receber</button>
              </div>
            </section>
          )}

          {/* Etapa 3: Recibo */}
          {etapa === 3 && (
            <section className="receipt-container">
              <div className="receipt-actions">
                <i className="fa fa-download" title="Baixar PDF"></i>
                <i className="fa fa-envelope" title="Enviar por e-mail"></i>
              </div>
              <div className="receipt-content">
                <h3>Recibo de Pagamento</h3>
                <p><strong>Inquilino:</strong> {inquilinoSelecionado?.nome}</p>
                <p><strong>Valor:</strong> R$ 1.200,00</p>
                <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
                <p><strong>Método:</strong> Cartão de Crédito</p>
              </div>
              <div className="btn-container">
                <button className="btn-receber" onClick={() => setEtapa(1)}>Novo Pagamento</button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
