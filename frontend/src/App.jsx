import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout e proteção
import Layout from './components/Layout.jsx';
import RotaProtegida from './components/RotaProtegida.jsx';

// Páginas
import Login from './pages/Login.jsx';
import Inicio from './pages/Inicio.jsx';
import NovoInquilino from './pages/NovoInquilino.jsx';
import NovoContrato from './pages/NovoContrato.jsx';
import ContratoVisualizacao from './pages/ContratoVisualizacao.jsx';
import Contratos from './pages/Contratos.jsx';
import ModelosContrato from './pages/ModelosContrato.jsx';
import EditarModeloContrato from './pages/EditarModeloContrato.jsx';
import Payment from './pages/Payment.jsx'; // ✅ Nome correto
import ReciboVisualizacao from './pages/ReciboVisualizacao.jsx';
import HistoricoPagamentos from './pages/HistoricoPagamentos.jsx';

// Estilos
import './styles/layout/layout.scss';
import './styles/main.scss';

export default function App() {
  return (
    <Routes>
      {/* Rota pública (login) */}
      <Route path="/" element={<Login />} />

      {/* Rotas protegidas dentro do layout */}
      <Route element={<Layout />}>
        <Route
          path="/inicio"
          element={
            <RotaProtegida>
              <Inicio />
            </RotaProtegida>
          }
        />
        <Route
          path="/novo-inquilino"
          element={
            <RotaProtegida>
              <NovoInquilino />
            </RotaProtegida>
          }
        />
        <Route
          path="/novo-contrato"
          element={
            <RotaProtegida>
              <NovoContrato />
            </RotaProtegida>
          }
        />
        <Route
          path="/contratos"
          element={
            <RotaProtegida>
              <Contratos />
            </RotaProtegida>
          }
        />
        <Route
          path="/contrato/:id"
          element={
            <RotaProtegida>
              <ContratoVisualizacao />
            </RotaProtegida>
          }
        />
        <Route
          path="/modelos"
          element={
            <RotaProtegida>
              <ModelosContrato />
            </RotaProtegida>
          }
        />
        <Route
          path="/editar-modelo/:id"
          element={
            <RotaProtegida>
              <EditarModeloContrato />
            </RotaProtegida>
          }
        />

        {/* ✅ CORRIGIDO AQUI */}
        <Route
          path="/payment"
          element={
            <RotaProtegida>
              <Payment />
            </RotaProtegida>
          }
        />

        <Route
          path="/recibo/:id"
          element={
            <RotaProtegida>
              <ReciboVisualizacao />
            </RotaProtegida>
          }
        />
        <Route
          path="/historico-pagamentos"
          element={
            <RotaProtegida>
              <HistoricoPagamentos />
            </RotaProtegida>
          }
        />
      </Route>
    </Routes>
  );
}
