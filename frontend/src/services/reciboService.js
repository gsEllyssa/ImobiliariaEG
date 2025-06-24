import api from './api';

// Lista todos os recibos
export const listarRecibos = async () => {
  try {
    const response = await api.get('/recibos');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar recibos:', error);
    return [];
  }
};

// Cria um novo recibo
export const criarRecibo = async (dados) => {
  try {
    const response = await api.post('/recibos', dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar recibo:', error);
    return null;
  }
};

// Busca um recibo específico por ID (opcional)
export const buscarReciboPorId = async (id) => {
  try {
    const response = await api.get(`/recibos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar recibo por ID:', error);
    return null;
  }
};

// Lista recibos por inquilino (opcional)
export const listarRecibosPorInquilino = async (tenantId) => {
  try {
    const response = await api.get(`/recibos?tenantId=${tenantId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar recibos por inquilino:', error);
    return [];
  }
};
