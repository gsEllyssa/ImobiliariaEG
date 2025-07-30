import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout and authentication
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Public page
import Login from './pages/Login.jsx';

// Private pages
import Home from './pages/Home.jsx';
import Tenants from './pages/Tenants.jsx';
import NewTenant from './pages/NewTenant.jsx';
import Contracts from './pages/Contracts.jsx';
import NewContract from './pages/NewContract.jsx';
import ContractView from './pages/ContractView.jsx';
import ContractTemplates from './pages/ContractTemplates.jsx';
import EditContractTemplate from './pages/EditContractTemplate.jsx';
import ContractForm from './pages/ContractForm.jsx';
import ContractCreate from './pages/NewContract.jsx';
import Payment from './pages/Payment.jsx';
import ReceiptView from './pages/ReceiptView.jsx';
import PaymentHistory from './pages/PaymentHistory.jsx';

// Global styles
import './styles/layout/layout.scss';
import './styles/main.scss';

export default function App() {
  return (
    <Routes>
      {/* Public page */}
      <Route path="/" element={<Login />} />

      {/* Protected layout */}
      <Route element={<Layout />}>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/tenants" element={<ProtectedRoute><Tenants /></ProtectedRoute>} />
        <Route path="/new-tenant" element={<ProtectedRoute><NewTenant /></ProtectedRoute>} />
        <Route path="/contracts" element={<ProtectedRoute><Contracts /></ProtectedRoute>} />
        <Route path="/new-contract" element={<ProtectedRoute><NewContract /></ProtectedRoute>} />
        <Route path="/contract-create" element={<ProtectedRoute><ContractCreate /></ProtectedRoute>} />
        <Route path="/contract/:id" element={<ProtectedRoute><ContractView /></ProtectedRoute>} />
        <Route path="/templates" element={<ProtectedRoute><ContractTemplates /></ProtectedRoute>} />
        <Route path="/edit-template/:id" element={<ProtectedRoute><EditContractTemplate /></ProtectedRoute>} />
        <Route path="/contract-form" element={<ProtectedRoute><ContractForm /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/receipt/:id" element={<ProtectedRoute><ReceiptView /></ProtectedRoute>} />
        <Route path="/payment-history" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
