import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import "../styles/modules/Menu.scss";

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [menuOpen, setMenuOpen] = useState(true);

  const nomeUsuario = localStorage.getItem("usuarioNome") || "Usuário";

  const toggleSubmenu = (menuKey) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    {
      key: "home",
      icon: "fa-house",
      label: "Início",
      path: "/inicio",
    },
    {
      key: "tenant",
      icon: "fa-users",
      label: "Inquilinos",
      submenu: [{ to: "/novo-inquilino", label: "🧑‍💼 Novo Inquilino" }],
    },
    {
      key: "payments",
      icon: "fa-dollar-sign",
      label: "Pagamentos",
      submenu: [
        { to: "/payment", label: "💳 Novo Pagamento" },
        { to: "/historico-pagamentos", label: "📜 Histórico de Pagamentos" },
      ],
    },
    {
      key: "contracts",
      icon: "fa-file-contract",
      label: "Contratos",
      submenu: [
        { to: "/contratos", label: "📑 Listar Contratos" },
        { to: "/modelos", label: "📂 Modelos de Contrato" },
      ],
    },
    {
      key: "receipt",
      icon: "fa-receipt",
      label: "Recibos",
      submenu: [{ to: "/recibo/1", label: "🧾 Visualizar Recibo (Exemplo)" }],
    },
    {
      key: "properties",
      icon: "fa-building",
      label: "Imóveis",
      submenu: [{ to: "/novo-imovel", label: "🏠 Novo Imóvel" }],
    },
    {
      key: "reports",
      icon: "fa-chart-pie",
      label: "Relatórios",
      submenu: [
        { to: "/relatorio-pagamentos", label: "📊 Pagamentos" },
        { to: "/relatorio-contratos", label: "📄 Contratos" },
        { to: "/relatorio-inquilinos", label: "🧑‍💼 Inquilinos" },
      ],
    },
  ];

  return (
    <aside className={classNames("menu-container", { collapsed: !menuOpen })}>
      {/* Cabeçalho do Menu */}
      <header className="menu-header">
        {menuOpen && (
          <div className="user-info">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nomeUsuario)}&background=random`}
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

      {/* Itens do Menu */}
      <nav className="menu-section">
        {menuItems.map((item) => (
          <div key={item.key} className="menu-group">
            {item.submenu ? (
              <>
                <div
                  className={classNames("menu-label", {
                    open: openSubmenus[item.key],
                  })}
                  onClick={() => toggleSubmenu(item.key)}
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                  {menuOpen && <span>{item.label}</span>}
                  {menuOpen && (
                    <i
                      className={`fa-solid ${
                        openSubmenus[item.key] ? "fa-angle-up" : "fa-angle-down"
                      } arrow`}
                    ></i>
                  )}
                </div>
                {menuOpen && openSubmenus[item.key] && (
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
              </>
            ) : (
              <Link
                to={item.path}
                className={classNames("menu-item", {
                  active: isActive(item.path),
                })}
              >
                <i className={`fa-solid ${item.icon}`}></i>
                {menuOpen && <span>{item.label}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Rodapé */}
      <footer className="menu-footer">
        <Link to="/configuracoes" className="menu-item">
          <i className="fa-solid fa-gear"></i>
          {menuOpen && <span>Configurações</span>}
        </Link>
        <Link to="/ajuda" className="menu-item">
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
