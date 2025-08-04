import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import "../styles/modules/Menu.scss";

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [menuOpen, setMenuOpen] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const nomeUsuario = user?.name || "Usuário";

  const toggleSubmenu = (menuKey) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    {
      key: "home",
      icon: "fa-house",
      label: "Início",
      path: "/home",
    },
    {
      key: "tenants",
      icon: "fa-users",
      label: "Inquilinos",
      path: "/tenants",
    },
    {
      key: "payments",
      icon: "fa-dollar-sign",
      label: "Pagamentos",
      path: "/payments",
      submenu: [
        { to: "/payment-history", label: "📜 Histórico de Pagamentos" },
      ],
    },
    {
      key: "contracts",
      icon: "fa-file-contract",
      label: "Contratos",
      path: "/contracts",
      submenu: [
        { to: "/templates", label: "📂 Modelos de Contrato" },
      ],
    },
    {
      key: "receipt",
      icon: "fa-receipt",
      label: "Recibos",
      path: "/receipt/1",
    },
    {
      key: "properties",
      icon: "fa-building",
      label: "Imóveis",
      path: "/new-property",
    },
    {
      key: "reports",
      icon: "fa-chart-pie",
      label: "Relatórios",
      submenu: [
        { to: "/report-payments", label: "📊 Pagamentos" },
        { to: "/report-contracts", label: "📄 Contratos" },
        { to: "/report-tenants", label: "🧑‍💼 Inquilinos" },
      ],
      path: "/report-payments",
    },
  ];

  return (
    <aside className={classNames("menu-container", { collapsed: !menuOpen })}>
      <header className="menu-header">
        {menuOpen && (
          <div className="user-info">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                nomeUsuario
              )}&background=random`}
              alt="Avatar do usuário"
              className="user-avatar"
            />
            <div className="user-details">
              <span className="user-name">Olá, {nomeUsuario.split(" ")[0]}</span>
              <span className="user-role">Administrador</span>
            </div>
          </div>
        )}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          title="Expandir/Recolher menu"
        >
          <i className={`fa-solid ${menuOpen ? "fa-angle-left" : "fa-bars"}`}></i>
        </button>
      </header>

      <nav className="menu-section">
        {menuItems.map((item) => (
          <div key={item.key} className="menu-group">
            <div
              className={classNames("menu-label", {
                active: isActive(item.path),
              })}
              onClick={() => {
                if (item.path) navigate(item.path);
                if (item.submenu) toggleSubmenu(item.key);
              }}
            >
              <i className={`fa-solid ${item.icon}`}></i>
              {menuOpen && <span>{item.label}</span>}
              {menuOpen && item.submenu?.length > 0 && (
                <i
                  className={`fa-solid ${
                    openSubmenus[item.key] ? "fa-angle-up" : "fa-angle-down"
                  } arrow`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubmenu(item.key);
                  }}
                ></i>
              )}
            </div>

            {menuOpen && openSubmenus[item.key] && item.submenu?.length > 0 && (
              <div className="submenu">
                {item.submenu.map((sub) => (
                  <Link
                    key={sub.to}
                    to={sub.to}
                    className={classNames("menu-item", {
                      active: isActive(sub.to),
                    })}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <footer className="menu-footer">
        <Link to="/settings" className="menu-item">
          <i className="fa-solid fa-gear"></i>
          {menuOpen && <span>Configurações</span>}
        </Link>
        <Link to="/help" className="menu-item">
          <i className="fa-solid fa-circle-question"></i>
          {menuOpen && <span>Ajuda</span>}
        </Link>
        <button className="menu-item logout" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          {menuOpen && <span>Sair</span>}
        </button>
      </footer>
    </aside>
  );
}
