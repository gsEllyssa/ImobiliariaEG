// backend/controllers/property.controller.js
import Property from "../models/property.model.js";

export const listProperties = async (_req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Error fetching properties." });
  }
};

export const createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(400).json({ error: "Error creating property." });
  }
};
