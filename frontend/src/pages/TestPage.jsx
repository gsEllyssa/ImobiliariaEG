// src/pages/TestPage.jsx

import React from 'react';

const TestPage = () => {
  // Este componente agora SÓ tem elementos visuais, sem nenhuma lógica.
  return (
    <div className="bg-indigo-600 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-extrabold text-white tracking-tight">
        Teste do Tailwind CSS
      </h1>
      <p className="mt-4 text-xl text-indigo-200">
        Se você está vendo esta tela, o problema foi resolvido!
      </p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-xl">
        <p className="text-gray-800">Este é um card de teste.</p>
      </div>
    </div>
  );
};

export default TestPage;