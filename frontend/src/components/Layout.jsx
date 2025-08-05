import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "./Menu";
import Topbar from "./Topbar";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Menu />
      <div className="flex-1 flex flex-col">
        <Topbar icon="faUserCircle" title="Página" subtitle="Conteúdo" />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            className="flex-1 p-6 md:p-8"
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
