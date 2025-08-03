import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listTemplates, deleteTemplate } from '../services/contractTemplateService';
import '../styles/modules/ContractTemplateList.scss';

export default function ContractTemplateList() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTemplates() {
      const data = await listTemplates();
      setTemplates(data);
    }
    fetchTemplates();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este modelo?');
    if (!confirm) return;
    await deleteTemplate(id);
    setTemplates(templates.filter((t) => t._id !== id));
  };

  return (
    <div className="template-list-page">
      <div className="header">
        <h2>Modelos de Contrato</h2>
        <button className="btn-create" onClick={() => navigate('/templates/new')}>
          + Novo Modelo
        </button>
      </div>

      <table className="template-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Última atualização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template._id}>
              <td>{template.title}</td>
              <td>{new Date(template.updatedAt).toLocaleDateString('pt-BR')}</td>
              <td>
                <button onClick={() => navigate(`/templates/${template._id}`)}>Editar</button>
                <button onClick={() => handleDelete(template._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
