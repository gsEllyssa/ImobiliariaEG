import React, { useState } from 'react';
import { createTenant } from '../services/tenantService';
import { useNavigate } from 'react-router-dom';
import '../styles/modules/NewTenant.scss';

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTenant(form);
      alert('✅ Inquilino cadastrado com sucesso!');
      navigate('/tenants');
    } catch (err) {
      alert('❌ Erro ao cadastrar inquilino.');
      console.error(err);
    }
  };

  return (
    <div className="new-tenant-page">
      <h2 className="page-title">Perfil do Inquilino</h2>

      <section className="section">
        <h3 className="section-title">📋 Dados do inquilino</h3>
        <form className="tenant-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              name="name"
              placeholder="Nome *"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              placeholder="Telefone *"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              name="birthdate"
              type="date"
              placeholder="Data de nascimento *"
              value={form.birthdate}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              placeholder="E-mail *"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="cpf"
              placeholder="CPF *"
              value={form.cpf}
              onChange={handleChange}
              required
            />
            <input
              name="address"
              placeholder="Endereço *"
              value={form.address}
              onChange={handleChange}
              required
            />
            <input
              name="rg"
              placeholder="RG *"
              value={form.rg}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-clear" onClick={handleClear}>
              Limpar
            </button>
            <button type="submit" className="btn-save">
              Salvar
            </button>
          </div>
        </form>
      </section>

      <section className="section">
        <h3 className="section-title">📎 Documentos do inquilino</h3>
        <div className="document-grid">
          {[
            'Carta de fiança',
            'Comprovante de residência',
            'Contrato de locação',
            'Documento de identificação',
            'Laudo de vistoria',
          ].map((label) => (
            <div className="doc-item" key={label}>
              <p>{label}</p>
              <div className="doc-icon">📁➕</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
