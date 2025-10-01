import Tenant from "../models/tenant.model.js";

// List all tenants
export const listTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tenants." });
  }
};

// Create a new tenant
export const createTenant = async (req, res) => {
  try {
    const newTenant = new Tenant(req.body);
    await newTenant.save();
    res.status(201).json(newTenant);
  } catch (error) {
    res.status(400).json({ error: "Failed to create tenant." });
  }
};
