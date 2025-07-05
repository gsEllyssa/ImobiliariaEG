import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public route
import Login from './pages/Login.jsx';

// Pages
import Inicio from './pages/Inicio.jsx';
import Payment from './pages/Payment.jsx';
import NovoInquilino from './pages/NovoInquilino.jsx';
import NovoContrato from './pages/NovoContrato.jsx';
import ContratoVisualizacao from './pages/ContratoVisualizacao.jsx';
import Contratos from './pages/Contratos.jsx';
import ModelosContrato from './pages/ModelosContrato.jsx';
import EditarModeloContrato from './pages/EditarModeloContrato.jsx';
import ConfigurarPagamento from './pages/ConfigurarPagamento.jsx';
import ReciboVisualizacao from './pages/ReciboVisualizacao.jsx';
import HistoricoPagamentos from './pages/HistoricoPagamentos.jsx';

// Styles
import './styles/layout/layout.scss';
import './styles/main.scss';

export default function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Login />} />

      {/* ✅ Liberada para funcionar sem proteção */}
      <Route path="/inicio" element={<Inicio />} />

      {/* Protected routes (mantidas) */}
      <Route path="/payment" element={<Payment />} />
      <Route path="/novo-inquilino" element={<NovoInquilino />} />
      <Route path="/novo-contrato" element={<NovoContrato />} />
      <Route path="/contratos" element={<Contratos />} />
      <Route path="/contrato/:id" element={<ContratoVisualizacao />} />
      <Route path="/modelos" element={<ModelosContrato />} />
      <Route path="/editar-modelo/:id" element={<EditarModeloContrato />} />
      <Route path="/configurar-pagamento" element={<ConfigurarPagamento />} />
      <Route path="/recibo/:id" element={<ReciboVisualizacao />} />
      <Route path="/historico-pagamentos" element={<HistoricoPagamentos />} />
    </Routes>
  );
}
