import api from './api';

export const criarPagamento = async (dados) => {
  const response = await api.post('/pagamentos', dados);
  return response.data;
};
