import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import "../styles/modules/Menu.scss";

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [menuOpen, setMenuOpen] = useState(true);

  const nomeUsuario = localStorage.getItem("usuarioNome") || "User";

  const toggleSubmenu = (menu) => {
    setOpenSubmenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
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
      label: "Home",
      path: "/inicio",
    },
    {
      key: "tenant",
      icon: "fa-users",
      label: "Tenants",
      submenu: [{ to: "/novo-inquilino", label: "🧑‍💼 New Tenant" }],
    },
    {
      key: "payments",
      icon: "fa-dollar-sign",
      label: "Payments",
      submenu: [
        { to: "/payment", label: "💳 New Payment" },
        { to: "/historico-pagamentos", label: "📜 Payment History" },
      ],
    },
    {
      key: "contracts",
      icon: "fa-file-contract",
      label: "Contracts",
      submenu: [
        { to: "/contratos", label: "📑 List Contracts" },
        { to: "/modelos", label: "📂 Contract Templates" },
      ],
    },
    {
      key: "receipt",
      icon: "fa-receipt",
      label: "Receipts",
      submenu: [
        { to: "/recibo/1", label: "🧾 View Receipt (Example)" },
      ],
    },
    {
      key: "properties",
      icon: "fa-building",
      label: "Properties",
      submenu: [{ to: "/novo-imovel", label: "🏠 New Property" }],
    },
    {
      key: "reports",
      icon: "fa-chart-pie",
      label: "Reports",
      submenu: [
        { to: "/relatorio-pagamentos", label: "📊 Payments Report" },
        { to: "/relatorio-contratos", label: "📄 Contracts Report" },
        { to: "/relatorio-inquilinos", label: "🧑‍💼 Tenants Report" },
      ],
    },
  ];

  return (
    <div className={classNames("menu-container", { collapsed: !menuOpen })}>
      {/* Header */}
      <div className="menu-header">
        {menuOpen && (
          <div className="user-info">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nomeUsuario)}&background=random`}
              alt="User"
              className="user-avatar"
            />
            <div className="user-details">
              <span className="user-name">
                Hello, {nomeUsuario.split(" ")[0]}
              </span>
              <span className="user-role">Admin</span>
            </div>
          </div>
        )}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`fa-solid ${menuOpen ? "fa-angle-left" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Menu Items */}
      <div className="menu-section">
        {menuItems.map((item) => (
          <div key={item.key} className="menu-group">
            {item.submenu ? (
              <>
                <div className="menu-label" onClick={() => toggleSubmenu(item.key)}>
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
                  <div className="submenu open">
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
      </div>

      {/* Footer */}
      <div className="menu-footer">
        <Link to="/configuracoes" className="menu-item">
          <i className="fa-solid fa-gear"></i>
          {menuOpen && <span>Settings</span>}
        </Link>
        <Link to="/ajuda" className="menu-item">
          <i className="fa-solid fa-circle-question"></i>
          {menuOpen && <span>Help</span>}
        </Link>
        <button className="menu-item logout" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          {menuOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
