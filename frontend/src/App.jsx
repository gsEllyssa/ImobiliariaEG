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
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/home" element={<Home />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/new-tenant" element={<NewTenant />} />
        <Route path="/payment" element={<Payment />} /> {/* Página de novo pagamento */}
        <Route path="/payments" element={<Payment />} /> {/* Página principal de pagamentos */}
        <Route path="/payment-history" element={<PaymentHistory />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/new-contract" element={<NewContract />} />
        <Route path="/contract-create" element={<ContractCreate />} />
        <Route path="/contract/:id" element={<ContractView />} />
        <Route path="/templates" element={<ContractTemplates />} />
        <Route path="/edit-template/:id" element={<EditContractTemplate />} />
        <Route path="/contract-form" element={<ContractForm />} />
        <Route path="/receipt/:id" element={<ReceiptView />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
