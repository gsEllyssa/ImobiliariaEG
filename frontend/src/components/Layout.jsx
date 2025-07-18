import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu.jsx";
import "../styles/layout/layout.scss";

export default function Layout() {
  return (
    <div className="layout-container">
      <Menu />
      <div className="page-content-area">
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
