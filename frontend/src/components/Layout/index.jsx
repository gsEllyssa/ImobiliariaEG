import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "../Menu";
import Topbar from "../Topbar";
import styles from "./Layout.module.scss"; // 1. Importa os novos estilos

export default function Layout() {
  const location = useLocation();

  return (
    // 2. Aplica a classe principal do layout
    <div className={styles.layoutContainer}>
      <Menu />

      <div className={styles.mainWrapper}>
        <Topbar icon="faUserCircle" title="Página" subtitle="Conteúdo" />

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            // 3. Aplica a classe na área de conteúdo
            className={styles.pageContent}
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