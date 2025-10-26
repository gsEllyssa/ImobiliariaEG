import React from 'react';
// BrowserRouter e AuthProvider NÃO SÃO MAIS IMPORTADOS AQUI
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout e Autenticação
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Este está modificado temporariamente

// Páginas Públicas (ainda existem, mas não serão o ponto de entrada principal por enquanto)
import Login from './pages/Login.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import TestPage from './pages/TestPage.jsx';

// Páginas "Protegidas" (agora acessíveis diretamente por causa do ProtectedRoute modificado)
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
import ContractTemplateList from './pages/ContractTemplateList.jsx';
import CreateContractTemplate from './pages/CreateContractTemplate.jsx';
import EditContractTemplate from './pages/EditContractTemplate.jsx';

// Estilos Globais
import './styles/global.scss';

export default function App() {
  return (
    // AuthProvider foi removido daqui, pois está no main.jsx
    // BrowserRouter foi removido daqui, pois está no main.jsx
    <Routes>
      {/* --- ROTAS PÚBLICAS (Ainda podem ser acessadas diretamente pela URL) --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/esqueci-minha-senha" element={<ForgotPassword />} />
      <Route path="/redefinir-senha/:token" element={<ResetPassword />} />
      <Route path="/test" element={<TestPage />} />

      {/* --- ROTAS "PROTEGIDAS" --- */}
      {/* O ProtectedRoute está modificado para SEMPRE permitir acesso */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
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
      </Route>

      {/* --- REDIRECIONAMENTOS (MODIFICADOS) --- */}
      {/* Agora a rota raiz '/' vai direto para '/home' */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      {/* Qualquer rota desconhecida também vai para '/home' */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}