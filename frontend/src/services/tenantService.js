import api from './api';

export const listTenants = async () => {
  const response = await api.get('/tenants');
  return response.data;
};

export const getTenantById = async (id) => {
  const response = await api.get(`/tenants/${id}`);
  return response.data;
};

export const createTenant = async (data) => {
  const response = await api.post('/tenants', data);
  return response.data;
};

export const updateTenant = async (id, data) => {
  const response = await api.put(`/tenants/${id}`, data);
  return response.data;
};

export const deleteTenant = async (id) => {
  const response = await api.delete(`/tenants/${id}`);
  return response.data;
};
