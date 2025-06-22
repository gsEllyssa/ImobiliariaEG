import Tenant from '../models/Inquilino.js';

export const getAllTenants = async (req, res) => {
  const tenants = await Tenant.find();
  res.json(tenants);
};

export const createTenant = async (req, res) => {
  const tenant = new Tenant(req.body);
  await tenant.save();
  res.status(201).json(tenant);
};
