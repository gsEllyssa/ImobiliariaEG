import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout and authentication
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Public page
import Login from './pages/Login.jsx';
import TestPage from './pages/TestPage.jsx';

// Private pages
import Home from './pages/Home.jsx';
import Tenants from './pages/Tenants.jsx';
import NewTenant from './pages/NewTenant.jsx';
import Contracts from './pages/Contracts.jsx';
import NewContract from './pages/NewContract.jsx';
import ContractView from './pages/ContractView.jsx';
import ContractForm from './pages/ContractForm.jsx';
import Payment from './pages/Payment.jsx';
import ReceiptView from './pages/ReceiptView.jsx';
import PaymentHistory from './pages/PaymentHistory.jsx';

// Contract Templates
import ContractTemplateList from './pages/ContractTemplateList.jsx';
import CreateContractTemplate from './pages/CreateContractTemplate.jsx';
import EditContractTemplate from './pages/EditContractTemplate.jsx';

export default function App() {
  return (
    <Routes>
      {/* ================================================= */}
      {/* ROTAS PÚBLICAS (acessíveis sem login)             */}
      {/* ================================================= */}
      <Route path="/" element={<Login />} />
      <Route path="/test" element={<TestPage />} />

      {/* ================================================= */}
      {/* ROTAS PRIVADAS (exigem login)                     */}
      {/* ================================================= */}
      {/* 1. Primeiro, a rota verifica se o usuário está logado (ProtectedRoute) */}
      <Route element={<ProtectedRoute />}>
        {/* 2. Se estiver logado, ele renderiza o Layout (menu, topo, etc.) */}
        <Route element={<Layout />}>
          {/* 3. DENTRO do Layout, ele renderiza a página específica */}

          <Route path="/home" element={<Home />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/new-tenant" element={<NewTenant />} />

          <Route path="/contracts" element={<Contracts />} />
          <Route path="/new-contract" element={<NewContract />} />
          <Route path="/contract/:id" element={<ContractView />} />
          <Route path="/contract-form" element={<ContractForm />} />

          <Route path="/payment" element={<Payment />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/receipt/:id" element={<ReceiptView />} />

          <Route path="/templates" element={<ContractTemplateList />} />
          <Route path="/templates/new" element={<CreateContractTemplate />} />
          <Route path="/templates/:id" element={<EditContractTemplate />} />
          
        </Route> {/* Fim do aninhamento do Layout */}
      </Route> {/* Fim do aninhamento do ProtectedRoute */}

      {/* ================================================= */}
      {/* REDIRECT (para qualquer rota não encontrada)      */}
      {/* ================================================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}