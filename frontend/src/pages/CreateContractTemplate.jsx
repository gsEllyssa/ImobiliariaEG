import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { createTemplate } from '../services/contractTemplateService';
import 'react-quill/dist/quill.snow.css';
import '../styles/modules/CreateContractTemplate.scss';

export default function CreateContractTemplate() {
  const [template, setTemplate] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!template.title || !template.content) {
      alert('Preencha todos os campos.');
      return;
    }

    await createTemplate(template);
    alert('Modelo criado com sucesso!');
    navigate('/templates');
  };

  return (
    <div className="create-template-page">
      <h2>Novo Modelo de Contrato</h2>

      <input
        className="input-title"
        placeholder="Título do modelo"
        value={template.title}
        onChange={(e) => setTemplate({ ...template, title: e.target.value })}
      />

      <ReactQuill
        value={template.content}
        onChange={(value) => setTemplate({ ...template, content: value })}
      />

      <button className="btn-save" onClick={handleSave}>
        Salvar Modelo
      </button>
    </div>
  );
}
