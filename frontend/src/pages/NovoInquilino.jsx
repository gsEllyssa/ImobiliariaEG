import React, { useState } from 'react';
import { criarInquilino } from '../services/inquilinoService';
import { useNavigate } from 'react-router-dom';

export default function NovoInquilino() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarInquilino(form);
      alert('✅ Inquilino cadastrado com sucesso!');
      navigate('/inicio');
    } catch (err) {
      alert('Erro ao cadastrar inquilino.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Novo Inquilino</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" onChange={handleChange} required />
        <input name="cpf" placeholder="CPF" onChange={handleChange} required />
        <input name="email" placeholder="E-mail" onChange={handleChange} />
        <input name="telefone" placeholder="Telefone" onChange={handleChange} />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
