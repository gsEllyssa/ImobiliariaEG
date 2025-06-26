import api from './api';

export const listarImoveis = async () => {
  try {
    const res = await api.get('/imoveis');
    return res.data;
  } catch (e) {
    console.error('Erro ao listar imóveis:', e);
    return [];
  }
};
