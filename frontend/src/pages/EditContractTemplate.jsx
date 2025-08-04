import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTemplateById, updateTemplate } from '../services/contractTemplateService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/modules/EditContractTemplate.scss';

export default function EditContractTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState({
    title: '',
    content: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const data = await getTemplateById(id);
        setTemplate({ title: data.title, content: data.content });
      } catch (error) {
        console.error('Erro ao carregar modelo:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplate();
  }, [id]);

  const handleChange = (field, value) => {
    setTemplate(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateTemplate(id, template);
      navigate('/templates');
    } catch (error) {
      console.error('Erro ao salvar modelo:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="loading">Carregando...</p>;

  return (
    <div className="edit-template-container">
      <h2>Editar Modelo de Contrato</h2>

      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          value={template.title}
          onChange={e => handleChange('title', e.target.value)}
          placeholder="Digite o título do modelo"
        />
      </div>

      <div className="form-group">
        <label>Conteúdo</label>
        <ReactQuill
          value={template.content}
          onChange={value => handleChange('content', value)}
          theme="snow"
        />
      </div>

      <button
        className="btn-save"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? 'Salvando...' : 'Salvar Alterações'}
      </button>
    </div>
  );
}
