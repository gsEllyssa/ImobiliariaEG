import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { createTemplate } from '../services/contractTemplateService';
import 'react-quill/dist/quill.snow.css';

export default function ContractTemplates() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!name || !content) {
      alert('Please fill in all fields.');
      return;
    }

    await createTemplate({ name, content });
    alert('Template saved!');
    window.location.href = '/templates';
  };

  return (
    <div className="contract-templates-page">
      <h2>Modelos de Contrato</h2>

      <div className="form-group">
        <label>Nome do Modelo</label>
        <input
          type="text"
          placeholder="Digite o nome do modelo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Conteúdo</label>
        <ReactQuill value={content} onChange={setContent} />
      </div>

      <div className="button-group">
        <button onClick={handleSave}>Salvar Modelo</button>
      </div>
    </div>
  );
}
