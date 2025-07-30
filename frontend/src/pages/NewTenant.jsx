import React, { useState } from 'react';
import { createTenant } from '../services/tenantService';
import { useNavigate } from 'react-router-dom';

export default function NewTenant() {
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTenant(form);
      alert('✅ Tenant successfully registered!');
      navigate('/tenants');
    } catch (err) {
      alert('❌ Error registering tenant.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>New Tenant</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full name" onChange={handleChange} required />
        <input name="cpf" placeholder="CPF" onChange={handleChange} required />
        <input name="email" placeholder="E-mail" onChange={handleChange} />
        <input name="phone" placeholder="Phone number" onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
