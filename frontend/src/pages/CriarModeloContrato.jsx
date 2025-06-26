import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { criarModelo } from '../../services/modeloService';
import 'react-quill/dist/quill.snow.css';

export default function CriarModeloContrato() {
  const [nome, setNome] = useState('');
  const [conteudo, setConteudo] = useState('');

  const handleSalvar = async () => {
    await criarModelo({ nome, conteudo });
    alert('Modelo salvo!');
    window.location.href = '/modelos';
  };

  return (
    <div className="criar-modelo-page">
      <h2>Criar novo modelo de contrato</h2>
      <input
        type="text"
        placeholder="Nome do modelo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <ReactQuill value={conteudo} onChange={setConteudo} />
      <button onClick={handleSalvar}>Salvar modelo</button>
    </div>
  );
}
