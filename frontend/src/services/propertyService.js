import api from "./api";

// 🔹 LISTAR (com suporte a filtros e paginação)
export const listProperties = async (params = {}) => {
  const response = await api.get("/api/properties", { params });
  return response.data;
};

// 🔹 BUSCAR POR ID
export const getPropertyById = async (id) => {
  const response = await api.get(`/api/properties/${id}`);
  return response.data;
};

// 🔹 CRIAR
export const createProperty = async (data) => {
  const response = await api.post("/api/properties", data);
  return response.data;
};

// 🔹 ATUALIZAR
export const updateProperty = async (id, data) => {
  const response = await api.put(`/api/properties/${id}`, data);
  return response.data;
};

// 🔹 DELETAR
export const deleteProperty = async (id) => {
  const response = await api.delete(`/api/properties/${id}`);
  return response.data;
};
