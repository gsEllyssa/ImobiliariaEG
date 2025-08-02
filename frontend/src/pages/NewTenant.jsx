import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTenant } from '../services/tenantService';
import '../styles/modules/NewTenant.scss';

const DOCUMENTS = [
  { key: 'idDoc', label: 'Documento de identificação' },
  { key: 'leaseContract', label: 'Contrato de locação' },
  { key: 'guaranteeLetter', label: 'Carta de fiança' },
  { key: 'residenceProof', label: 'Comprovante de residência' },
  { key: 'inspectionReport', label: 'Laudo de vistoria' },
];

export default function NewTenant() {
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    birthdate: '',
    address: '',
    rg: '',
  });

  const [documents, setDocuments] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setForm({
      name: '',
      cpf: '',
      email: '',
      phone: '',
      birthdate: '',
      address: '',
      rg: '',
    });
    setDocuments({});
  };

  const handleFileChange = (key, file) => {
    setDocuments((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    Object.entries(documents).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      await createTenant(formData);
      alert('✅ Inquilino cadastrado com sucesso!');
      navigate('/tenants');
    } catch (error) {
      alert('❌ Erro ao cadastrar inquilino.');
      console.error(error);
    }
  };

  return (
    <div className="new-tenant-page">
      <h2 className="page-title">Perfil do Inquilino</h2>

      <section className="section">
        <h3 className="section-title">📋 Dados do inquilino</h3>
        <form className="tenant-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <input name="name" placeholder="Nome *" value={form.name} onChange={handleChange} required />
            <input name="phone" placeholder="Telefone *" value={form.phone} onChange={handleChange} required />
            <input name="birthdate" type="date" value={form.birthdate} onChange={handleChange} required />
            <input name="email" placeholder="E-mail *" value={form.email} onChange={handleChange} required />
            <input name="cpf" placeholder="CPF *" value={form.cpf} onChange={handleChange} required />
            <input name="address" placeholder="Endereço *" value={form.address} onChange={handleChange} required />
            <input name="rg" placeholder="RG *" value={form.rg} onChange={handleChange} required />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-clear" onClick={handleClear}>Limpar</button>
            <button type="submit" className="btn-save">Salvar</button>
          </div>
        </form>
      </section>

      <section className="section">
        <h3 className="section-title">📎 Documentos do inquilino</h3>
        <div className="document-grid">
          {DOCUMENTS.map(({ key, label }) => (
            <div className="doc-item" key={key}>
              <label className="doc-label">{label}</label>
              <label className="doc-upload">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileChange(key, e.target.files[0])}
                />
                <div className="doc-icon">
                  {documents[key] ? '📄' : '📁➕'}
                </div>
                {documents[key] && (
                  <div className="doc-name">{documents[key].name}</div>
                )}
              </label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
