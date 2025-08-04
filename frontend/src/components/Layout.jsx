import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "./Menu";
import Topbar from "./Topbar";
import "../styles/layout/layout.scss";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="layout-container">
      <Menu />
      <div className="page-content-area">
        <Topbar icon="faUserCircle" title="Página" subtitle="Conteúdo" />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            className="content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
