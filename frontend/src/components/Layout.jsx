import React from "react";
import Menu from "./Menu.jsx";
import "../styles/layout/layout.scss";

export default function Layout({ children }) {
  const nomeUsuario = localStorage.getItem("usuarioNome") || "Usuário";

  return (
    <div className="layout-container">
      <Menu />
      <div className="page-content-area">
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-title">Painel do Sistema</div>
            <div className="topbar-subtitle">Gestão Imobiliária</div>
          </div>

          <div className="topbar-actions">
            <span className="user-welcome">
              Olá, <strong>{nomeUsuario.split(" ")[0]}</strong>
            </span>
            <img
              src="https://ui-avatars.com/api/?name=Usuário&background=random"
              alt="Avatar"
              className="user-avatar"
            />
          </div>
        </header>

        <main className="content">{children}</main>
      </div>
    </div>
  );
}
