import api from './api';

/**
 * Cria um novo inquilino na base de dados
 */
export const criarInquilino = async (dados) => {
  const response = await api.post('/inquilinos', dados);
  return response.data;
};

/**
 * Lista todos os inquilinos cadastrados, filtrando apenas os válidos
 */
export const listarInquilinos = async () => {
  try {
    const response = await api.get('/inquilinos');
    const dados = response.data;

    if (!Array.isArray(dados)) throw new Error('Formato de resposta inválido');

    // Garante que todos os inquilinos tenham um nome válido
    const filtrados = dados.filter((i) => typeof i?.nome === 'string');

    return filtrados;
  } catch (erro) {
    console.error('Erro ao listar inquilinos:', erro);
    return [];
  }
};
