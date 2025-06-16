import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '@/pages/Inicio.jsx';
import Login from '@/pages/Login.jsx';
import Pagamento from '@/pages/Pagamento.jsx';

import '@/styles/layout/layout.scss';
import '@/styles/main.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/pagamento" element={<Pagamento />} />
      </Routes>
    </Router>
  );
}

export default App;
