import api from './api';

export const listTemplates = async () => {
  const response = await api.get('/templates');
  return response.data;
};

export const getTemplateById = async (id) => {
  const response = await api.get(`/templates/${id}`);
  return response.data;
};

export const createTemplate = async (data) => {
  const response = await api.post('/templates', data);
  return response.data;
};

export const updateTemplate = async (id, data) => {
  const response = await api.put(`/templates/${id}`, data);
  return response.data;
};

export const deleteTemplate = async (id) => {
  const response = await api.delete(`/templates/${id}`);
  return response.data;
};
