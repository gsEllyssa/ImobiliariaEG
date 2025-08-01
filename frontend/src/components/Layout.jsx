import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "./Menu.jsx";
import Topbar from "./Topbar.jsx";
import "../styles/layout/layout.scss";

export default function Layout() {
  const location = useLocation();

  // Exemplo de extração dinâmica de título com base na rota
  const routeMap = {
    "/home": { icon: "faUserCircle", title: "Início", subtitle: "Visão geral" },
    "/tenants": { icon: "faUserCircle", title: "Inquilinos", subtitle: "Listagem" },
    "/contracts": { icon: "faUserCircle", title: "Contratos", subtitle: "Gerenciar" },
    "/payments": { icon: "faUserCircle", title: "Pagamentos", subtitle: "Histórico" },
    // Adicione outras rotas conforme necessário
  };

  const currentRoute = routeMap[location.pathname] || {
    icon: "faUserCircle",
    title: "Página",
    subtitle: "Detalhes",
  };

  return (
    <div className="layout-container">
      <Menu />
      <div className="page-content-area">
        <Topbar
          icon={currentRoute.icon}
          title={currentRoute.title}
          subtitle={currentRoute.subtitle}
        />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
