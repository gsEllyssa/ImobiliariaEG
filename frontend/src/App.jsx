import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from './pages/Inicio.jsx';
import Login from './pages/Login.jsx';
import Pagamento from './pages/Pagamento.jsx';
import NovoInquilino from './pages/NovoInquilino.jsx';
import NovoContrato from './pages/NovoContrato.jsx';
import ContratoVisualizacao from './pages/ContratoVisualizacao.jsx';
import Contratos from './pages/Contratos.jsx';
import ModelosContrato from './pages/ModelosContrato.jsx';
import EditarModeloContrato from './pages/EditarModeloContrato.jsx';

import RotaProtegida from './components/RotaProtegida.jsx';

import './styles/layout/layout.scss';
import './styles/main.scss';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login (rota pública) */}
        <Route path="/" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/inicio"
          element={
            <RotaProtegida>
              <Inicio />
            </RotaProtegida>
          }
        />
        <Route
          path="/pagamento"
          element={
            <RotaProtegida>
              <Pagamento />
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
          path="/historico-pagamentos"
          element={
            <RotaProtegida>
              <h1>Histórico de pagamentos (em construção)</h1>
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
          path="/contratos"
          element={
            <RotaProtegida>
              <Contratos />
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
      </Routes>
    </Router>
  );
}
