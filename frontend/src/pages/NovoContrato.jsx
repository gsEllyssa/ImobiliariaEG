import React, { useEffect, useState } from 'react';
import { criarContrato } from '../services/contratoService';
import { listarInquilinos } from '../services/inquilinoService';
import { listarImoveis } from '../services/imovelService';
import '../styles/modules/NovoContrato.scss';

export default function NovoContrato() {
  const [inquilinos, setInquilinos] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [form, setForm] = useState({
    locador: '',
    cpfLocador: '',
    locatario: '',
    cpfLocatario: '',
    imovel: '',
    enderecoImovel: '',
    valorAluguel: '',
    dataInicio: '',
    dataFim: '',
    vencimento: '',
    prazo: '',
    garantias: {
      fiador: false,
      caucao: false,
      seguroFianca: false
    },
    observacoes: ''
  });

  useEffect(() => {
    async function carregarDados() {
      const inqs = await listarInquilinos();
      const imvs = await listarImoveis();
      setInquilinos(inqs);
      setImoveis(imvs);
    }
    carregarDados();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('garantias.')) {
      const campo = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        garantias: {
          ...prev.garantias,
          [campo]: checked
        }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imovelSelecionado = imoveis.find(i => i._id === form.imovel);
      const dadosComEndereco = {
        ...form,
        valorAluguel: Number(form.valorAluguel),
        enderecoImovel: imovelSelecionado?.endereco || ''
      };
      await criarContrato(dadosComEndereco);
      alert('Contrato criado com sucesso!');
      window.location.href = '/contratos';
    } catch (err) {
      console.error('Erro ao criar contrato:', err);
      alert('Erro ao criar contrato');
    }
  };

  return (
    <div className="novo-contrato-page">
      <h2>Novo Contrato</h2>
      <form className="form-contrato" onSubmit={handleSubmit}>
        <label>Locador</label>
        <input name="locador" value={form.locador} onChange={handleChange} required />

        <label>CPF Locador</label>
        <input name="cpfLocador" value={form.cpfLocador} onChange={handleChange} required />

        <label>Locatário (Inquilino)</label>
        <select name="locatario" value={form.locatario} onChange={handleChange} required>
          <option value="">Selecione um inquilino</option>
          {inquilinos.map((i) => (
            <option key={i._id} value={i._id}>{i.nome}</option>
          ))}
        </select>

        <label>CPF Locatário</label>
        <input name="cpfLocatario" value={form.cpfLocatario} onChange={handleChange} required />

        <label>Imóvel</label>
        <select name="imovel" value={form.imovel} onChange={handleChange} required>
          <option value="">Selecione um imóvel</option>
          {imoveis.map((i) => (
            <option key={i._id} value={i._id}>{i.descricao}</option>
          ))}
        </select>

        <label>Valor do Aluguel</label>
        <input type="number" name="valorAluguel" value={form.valorAluguel} onChange={handleChange} required />

        <label>Prazo (ex: 12 meses)</label>
        <input name="prazo" value={form.prazo} onChange={handleChange} required />

        <label>Data de Início</label>
        <input type="date" name="dataInicio" value={form.dataInicio} onChange={handleChange} required />

        <label>Data de Término</label>
        <input type="date" name="dataFim" value={form.dataFim} onChange={handleChange} required />

        <label>Dia de Vencimento</label>
        <input type="date" name="vencimento" value={form.vencimento} onChange={handleChange} required />

        <fieldset>
          <legend>Garantias</legend>
          <label>
            <input type="checkbox" name="garantias.fiador" checked={form.garantias.fiador} onChange={handleChange} />
            Fiador
          </label>
          <label>
            <input type="checkbox" name="garantias.caucao" checked={form.garantias.caucao} onChange={handleChange} />
            Caução
          </label>
          <label>
            <input type="checkbox" name="garantias.seguroFianca" checked={form.garantias.seguroFianca} onChange={handleChange} />
            Seguro Fiança
          </label>
        </fieldset>

        <label>Observações</label>
        <textarea name="observacoes" value={form.observacoes} onChange={handleChange} />

        <button type="submit">Salvar Contrato</button>
      </form>
    </div>
  );
}
