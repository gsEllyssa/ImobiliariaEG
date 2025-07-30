import api from './api';

export const listContracts = async () => {
  const response = await api.get('/contracts');
  return response.data;
};

export const getContractById = async (id) => {
  const response = await api.get(`/contracts/${id}`);
  return response.data;
};

export const createContract = async (data) => {
  const response = await api.post('/contracts', data);
  return response.data;
};

export const updateContract = async (id, data) => {
  const response = await api.put(`/contracts/${id}`, data);
  return response.data;
};

export const deleteContract = async (id) => {
  const response = await api.delete(`/contracts/${id}`);
  return response.data;
};
