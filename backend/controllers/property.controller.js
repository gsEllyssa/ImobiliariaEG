// backend/controllers/property.controller.js
import Property from "../models/property.model.js";

/**
 * LISTAR + BUSCAR + PAGINAR
 * GET /api/imoveis?cep=...&sqls=...&q=...&status=...&page=1&limit=20
 */
export const listProperties = async (req, res) => {
  try {
    const { page = 1, limit = 20, cep, sqls, q, status } = req.query;

    const filter = {};
    if (cep)  filter.cep  = new RegExp(escapeRegex(cep), "i");
    if (sqls) filter.sqls = new RegExp(escapeRegex(sqls), "i");
    if (status) filter.status = status;

    if (q) {
      const rx = new RegExp(escapeRegex(q), "i");
      filter.$or = [{ cep: rx }, { sqls: rx }, { street: rx }, { city: rx }, { district: rx }];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit))); // limite de segurança
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      Property.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      Property.countDocuments(filter),
    ]);

    res.json({
      items,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Error fetching properties." });
  }
};

/**
 * CRIAR
 */
export const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(400).json({ error: "Error creating property." });
  }
};

/**
 * DETALHES
 * GET /api/imoveis/:id
 */
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).lean();
    if (!property) return res.status(404).json({ error: "Property not found." });
    res.json(property);
  } catch (err) {
    console.error("Error getting property:", err);
    res.status(400).json({ error: "Invalid id." });
  }
};

/**
 * EDITAR (parcial)
 * PATCH /api/imoveis/:id
 */
export const updateProperty = async (req, res) => {
  try {
    const allowed = ["cep", "sqls", "street", "number", "district", "city", "state", "status", "documents"];
    const data = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));

    const updated = await Property.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) return res.status(404).json({ error: "Property not found." });
    res.json(updated);
  } catch (err) {
    console.error("Error updating property:", err);
    res.status(400).json({ error: "Error updating property." });
  }
};

// util: escapa termos de busca para uso seguro em RegExp
function escapeRegex(s) {
  return s?.toString().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
