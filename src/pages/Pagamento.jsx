import React, { useEffect } from 'react';

function Pagamento() {
  useEffect(() => {
    fetch('/menu.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('menu-container').innerHTML = html;
      });
  }, []);

  return (
    <>
      <div id="menu-container"></div>

      <header className="topbar" role="banner">
        <div className="topbar-content">
          <nav className="breadcrumbs" aria-label="Navegação de localização">
            <i className="fas fa-dollar-sign" aria-hidden="true"></i>
            <span className="current">Pagamentos</span>
          </nav>
          <div className="top-actions">
            <input type="text" className="search" placeholder="Pesquisar" disabled aria-disabled="true" />
            <i className="fas fa-sun" aria-hidden="true"></i>
            <i className="fas fa-bell" aria-hidden="true"></i>
            <i className="fas fa-window-restore" aria-hidden="true"></i>
          </div>
        </div>
      </header>

      <main className="content" id="content">
        <div className="progress-container" role="group" aria-label="Etapas do pagamento">
          <div className="step completed" data-step="1">
            <div className="circle">
              <i className="fas fa-check" aria-hidden="true"></i>
            </div>
            <span className="label">Inquilino</span>
          </div>
          <div className="step completed" data-step="2">
            <div className="circle">
              <i className="fas fa-check" aria-hidden="true"></i>
            </div>
            <span className="label">Pagamento</span>
          </div>
          <div className="step completed" data-step="3">
            <div className="circle">
              <i className="fas fa-check" aria-hidden="true"></i>
            </div>
            <span className="label">Comprovante</span>
          </div>
        </div>

        <section className="search-tenant-section">
          <input
            type="text"
            className="tenant-search"
            placeholder="Pesquisar pelo nome"
            aria-label="Pesquisar inquilino"
          />
          <ul className="tenant-list">
            <li className="tenant-item active">
              <i className="fas fa-clock"></i>
              <span>Roberto Carvalho Cunha</span>
            </li>
            <li className="tenant-item disabled">
              <i className="fas fa-clock"></i>
              <span>Yara Lacerda Oliveira</span>
            </li>
            <li className="tenant-item disabled">
              <i className="fas fa-clock"></i>
              <span>Sabrina Vasconcelos Souza</span>
            </li>
            <li className="tenant-item disabled">
              <i className="fas fa-clock"></i>
              <span>Ellyssa Pereira Castro</span>
            </li>
          </ul>
        </section>

        <section className="payment-summary">
          <h3>Resumo</h3>
          <p>Aluguel comercial.</p>
          <p>
            Recebi (emos) de <strong>Padaria Lanchonete Braz Machado LTDA</strong>,
            a importância de <strong>um mil e cinquenta e cinco reais</strong>. Valor pactuado entre as partes.
          </p>
          <p>
            Proveniente do aluguel de <br />
            Sítio à Rua Estados Unidos, número 21, bairro Cariru. <br />
            Referente ao período de 10/Out a 10/Nov/24 <strong>Vencido em 10/Nov/2024</strong>.
          </p>

          <div className="payment-boxes">
            <div className="box">
              <span className="label">Método de Pagamento</span>
              <strong>Dinheiro</strong>
            </div>
            <div className="box">
              <span className="label">Valor Total</span>
              <strong>R$ 1.700,00</strong>
            </div>
          </div>

          <div className="btn-container">
            <button type="button" className="btn-cancelar">Cancelar</button>
            <button type="button" className="btn-receber">Receber</button>
          </div>
        </section>

        <section className="receipt-container">
          <div className="receipt-actions">
            <i className="fas fa-download" title="Download"></i>
            <i className="fas fa-print" title="Imprimir"></i>
          </div>
          <div className="receipt-content">
            <h3>Recibo de Aluguel</h3>
            <p>Aluguel comercial.</p>
            <p>
              Recebi (emos) de <strong>Padaria Lanchonete Braz Machado LTDA</strong>,
              a importância de <strong>um mil e cinquenta e cinco reais</strong>. Valor pactuado entre as partes.
            </p>
            <p>
              Proveniente do aluguel de <br />
              Sítio à Rua Estados Unidos, número 21, bairro Cariru. <br />
              Referente ao período de 10/Out a 10/Nov/24 <strong>Vencido em 10/Nov/2024</strong>.
            </p>
            <p>Assinatura: Cleia Maria Oliveira</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Pagamento;
