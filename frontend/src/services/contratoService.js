import api from './api';

export const listarContratos = async () => {
  const response = await api.get('/contratos');
  return response.data;
};

export const obterContratoPorId = async (id) => {
  const response = await api.get(`/contratos/${id}`);
  return response.data;
};

export const criarContrato = async (dados) => {
  const response = await api.post('/contratos', dados);
  return response.data;
};

export const atualizarContrato = async (id, dados) => {
  const response = await api.put(`/contratos/${id}`, dados);
  return response.data;
};

export const deletarContrato = async (id) => {
  const response = await api.delete(`/contratos/${id}`);
  return response.data;
};
