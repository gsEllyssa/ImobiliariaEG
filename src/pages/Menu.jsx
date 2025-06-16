import React from "react";
import '@/styles/modules/Menu.scss';

function Menu() {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <i className="fas fa-user-circle"></i>
          <span className="user-name">Cleia Maria</span>
        </div>
        <button className="menu-toggle" aria-label="Abrir ou fechar menu lateral">
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <ul className="menu">
        <li className="title">Dashboard</li>
        <li className="active">
          <a href="/inicio">
            <i className="fas fa-tachometer-alt"></i>
            <span>Início</span>
          </a>
        </li>

        <li className="title">Páginas</li>

        <li className="has-submenu">
          <div className="menu-item">
            <i className="fas fa-user"></i>
            <span>Inquilino</span>
            <i className="fas fa-chevron-down arrow"></i>
          </div>
          <ul className="submenu">
            <li>
              <i className="fas fa-user-plus"></i>
              <span>Novo Inquilino</span>
            </li>
          </ul>
        </li>

        <li className="has-submenu">
          <a href="/pagamento" className="menu-item">
            <i className="fas fa-money-bill"></i>
            <span>Pagamentos</span>
            <i className="fas fa-chevron-down arrow"></i>
          </a>
          <ul className="submenu">
            <li>
              <a href="/pagamento">
                <i className="fas fa-history"></i>
                <span>Histórico de Pagamentos</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="has-submenu">
          <div className="menu-item">
            <i className="fas fa-file-contract"></i>
            <span>Contrato</span>
            <i className="fas fa-chevron-down arrow"></i>
          </div>
          <ul className="submenu">
            <li>
              <i className="fas fa-file-signature"></i>
              <span>Novo Contrato</span>
            </li>
          </ul>
        </li>

        <li className="has-submenu">
          <div className="menu-item">
            <i className="fas fa-building"></i>
            <span>Imóveis</span>
            <i className="fas fa-chevron-down arrow"></i>
          </div>
          <ul className="submenu">
            <li>
              <i className="fas fa-plus-square"></i>
              <span>Novo Imóvel</span>
            </li>
          </ul>
        </li>

        <li className="has-submenu">
          <div className="menu-item">
            <i className="fas fa-chart-pie"></i>
            <span>Relatórios</span>
            <i className="fas fa-chevron-down arrow"></i>
          </div>
          <ul className="submenu">
            <li>
              <i className="fas fa-chart-line"></i>
              <span>Pagamentos</span>
            </li>
            <li>
              <i className="fas fa-address-book"></i>
              <span>Contatos</span>
            </li>
            <li>
              <i className="fas fa-users"></i>
              <span>Inquilinos</span>
            </li>
          </ul>
        </li>

        <li><hr className="menu-separator" /></li>

        <li className="title">Outros</li>
        <li>
          <i className="fas fa-cog"></i>
          <span>Configurações</span>
        </li>
        <li>
          <i className="fas fa-question-circle"></i>
          <span>Ajuda</span>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
