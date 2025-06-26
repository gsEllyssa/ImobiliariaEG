import api from './api';

export const listarModelos = async () => {
  const response = await api.get('/modelos');
  return response.data;
};

export const obterModeloPorId = async (id) => {
  const response = await api.get(`/modelos/${id}`);
  return response.data;
};

export const criarModelo = async (dados) => {
  const response = await api.post('/modelos', dados);
  return response.data;
};

export const atualizarModelo = async (id, dados) => {
  const response = await api.put(`/modelos/${id}`, dados);
  return response.data;
};

export const deletarModelo = async (id) => {
  const response = await api.delete(`/modelos/${id}`);
  return response.data;
};
