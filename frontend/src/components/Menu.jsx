import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

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
    { key: "home", icon: "fa-house", label: "Início", path: "/home" },
    { key: "tenants", icon: "fa-users", label: "Inquilinos", path: "/tenants" },
    {
      key: "payments",
      icon: "fa-dollar-sign",
      label: "Pagamentos",
      path: "/payments",
      submenu: [{ to: "/payment-history", label: "📜 Histórico de Pagamentos" }],
    },
    {
      key: "contracts",
      icon: "fa-file-contract",
      label: "Contratos",
      path: "/contracts",
      submenu: [{ to: "/templates", label: "📂 Modelos de Contrato" }],
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
      path: "/report-payments",
      submenu: [
        { to: "/report-payments", label: "📊 Pagamentos" },
        { to: "/report-contracts", label: "📄 Contratos" },
        { to: "/report-tenants", label: "🧑‍💼 Inquilinos" },
      ],
    },
  ];

  return (
    <aside
      className={classNames(
        "min-h-screen transition-all duration-300 flex flex-col bg-white border-r border-gray-200 shadow-sm",
        menuOpen ? "w-64" : "w-20"
      )}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        {menuOpen && (
          <div className="flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                nomeUsuario
              )}&background=random`}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Olá, {nomeUsuario.split(" ")[0]}
              </p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-500 hover:text-gray-800"
          title="Expandir/Recolher menu"
        >
          <i className={`fa-solid ${menuOpen ? "fa-angle-left" : "fa-bars"}`}></i>
        </button>
      </header>

      {/* Menu */}
      <nav className="flex-1 p-2 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.key}>
            <div
              onClick={() => {
                if (item.path) navigate(item.path);
                if (item.submenu) toggleSubmenu(item.key);
              }}
              className={classNames(
                "flex items-center justify-between px-4 py-2 rounded-md cursor-pointer text-gray-700 hover:bg-gray-100 transition",
                isActive(item.path) && "bg-gray-200 font-semibold"
              )}
            >
              <div className="flex items-center gap-3">
                <i className={`fa-solid ${item.icon} w-4 text-center`} />
                {menuOpen && <span>{item.label}</span>}
              </div>
              {menuOpen && item.submenu?.length > 0 && (
                <i
                  className={`fa-solid ${
                    openSubmenus[item.key] ? "fa-angle-up" : "fa-angle-down"
                  } text-sm text-gray-500`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubmenu(item.key);
                  }}
                ></i>
              )}
            </div>

            {/* Submenu */}
            {menuOpen &&
              openSubmenus[item.key] &&
              item.submenu?.length > 0 && (
                <div className="ml-8 mt-1 flex flex-col gap-1">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      className={classNames(
                        "text-sm text-gray-600 py-1 px-2 rounded hover:bg-gray-100 transition",
                        isActive(sub.to) && "bg-blue-100 text-blue-700 font-semibold"
                      )}
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
      <footer className="p-3 border-t border-gray-100 space-y-2">
        <Link
          to="/settings"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          <i className="fa-solid fa-gear w-4 text-center" />
          {menuOpen && <span>Configurações</span>}
        </Link>
        <Link
          to="/help"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          <i className="fa-solid fa-circle-question w-4 text-center" />
          {menuOpen && <span>Ajuda</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-100 rounded w-full text-left"
        >
          <i className="fa-solid fa-right-from-bracket w-4 text-center" />
          {menuOpen && <span>Sair</span>}
        </button>
      </footer>
    </aside>
  );
}