// frontend/src/components/Menu/index.jsx (VERSÃO ATUALIZADA)
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import styles from "./Menu.module.scss";

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
    // Seus menuItems continuam os mesmos
    { key: "home", icon: "fa-house", label: "Início", path: "/home" },
    { key: "tenants", icon: "fa-users", label: "Inquilinos", path: "/tenants" },
    { key: "payments", icon: "fa-dollar-sign", label: "Pagamentos", path: "/payments", submenu: [{ to: "/payment-history", label: "📜 Histórico" }] },
    { key: "contracts", icon: "fa-file-contract", label: "Contratos", path: "/contracts", submenu: [{ to: "/templates", label: "📂 Modelos" }] },
    { key: "receipt", icon: "fa-receipt", label: "Recibos", path: "/receipt/1" },
    { key: "properties", icon: "fa-building", label: "Imóveis", path: "/new-property" },
    { key: "reports", icon: "fa-chart-pie", label: "Relatórios", path: "/report-payments", submenu: [{ to: "/report-payments", label: "📊 Pagamentos" }, { to: "/report-contracts", label: "📄 Contratos" }] },
  ];

  return (
    <aside
      className={classNames(styles.menuContainer, {
        [styles["menuContainer--open"]]: menuOpen,
        [styles["menuContainer--closed"]]: !menuOpen,
      })}
    >
      {/* Header */}
      <header className={styles.header}>
        {menuOpen && (
          <div className={styles.userInfo}>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nomeUsuario)}&background=random`}
              alt="Avatar"
              className={styles.avatar}
            />
            <div className={styles.text}>
              <p className={styles.name}>Olá, {nomeUsuario.split(" ")[0]}</p>
              <p className={styles.role}>Administrador</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={styles.toggleButton}
          title="Expandir/Recolher menu"
        >
          <i className={`fa-solid ${menuOpen ? "fa-angle-left" : "fa-bars"}`}></i>
        </button>
      </header>

      {/* Menu */}
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <div key={item.key} className={styles.menuItem}>
            <div
              onClick={() => {
                if (item.path) navigate(item.path);
                if (item.submenu) toggleSubmenu(item.key);
              }}
              className={classNames(styles.menuLink, {
                [styles["menuLink--active"]]: isActive(item.path),
              })}
            >
              <div className={styles.menuLink__content}>
                <i className={classNames(`fa-solid ${item.icon}`, styles.menuLink__icon)} />
                {menuOpen && <span className={styles.menuLink__label}>{item.label}</span>}
              </div>
              {menuOpen && item.submenu?.length > 0 && (
                <i
                  className={classNames(
                    `fa-solid ${openSubmenus[item.key] ? "fa-angle-up" : "fa-angle-down"}`,
                    styles.submenuToggle
                  )}
                  onClick={(e) => { e.stopPropagation(); toggleSubmenu(item.key); }}
                ></i>
              )}
            </div>

            {/* Submenu */}
            {menuOpen && openSubmenus[item.key] && item.submenu?.length > 0 && (
              <div className={styles.submenu}>
                {item.submenu.map((sub) => (
                  <Link
                    key={sub.to}
                    to={sub.to}
                    className={classNames(styles.submenu__link, {
                      [styles["submenu__link--active"]]: isActive(sub.to),
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

      {/* Footer */}
      <footer className={styles.footer}>
        <Link to="/settings" className={styles.footerLink}>
          <i className="fa-solid fa-gear w-4 text-center" />
          {menuOpen && <span>Configurações</span>}
        </Link>
        <Link to="/help" className={styles.footerLink}>
          <i className="fa-solid fa-circle-question w-4 text-center" />
          {menuOpen && <span>Ajuda</span>}
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <i className="fa-solid fa-right-from-bracket w-4 text-center" />
          {menuOpen && <span>Sair</span>}
        </button>
      </footer>
    </aside>
  );
}