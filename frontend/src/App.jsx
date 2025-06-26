import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from './pages/Inicio.jsx';
import Login from './pages/Login.jsx';
import Pagamento from './pages/Pagamento.jsx';
import NovoInquilino from './pages/NovoInquilino.jsx';
import NovoContrato from './pages/NovoContrato.jsx'; // ✅ ADICIONADO

import ContratoVisualizacao from './pages/ContratoVisualizacao.jsx';
import Contratos from './pages/Contratos.jsx';
import ModelosContrato from './pages/ModelosContrato.jsx';
import EditarModeloContrato from './pages/EditarModeloContrato.jsx';

import './styles/layout/layout.scss';
import './styles/main.scss';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/novo-inquilino" element={<NovoInquilino />} />
        <Route path="/novo-contrato" element={<NovoContrato />} /> {/* ✅ ADICIONADO */}
        <Route path="/historico-pagamentos" element={<h1>Histórico de pagamentos (em construção)</h1>} />

        {/* Rotas de Contratos */}
        <Route path="/contrato/:id" element={<ContratoVisualizacao />} />
        <Route path="/contratos" element={<Contratos />} />
        <Route path="/modelos" element={<ModelosContrato />} />
        <Route path="/editar-modelo/:id" element={<EditarModeloContrato />} />
      </Routes>
    </Router>
  );
}
