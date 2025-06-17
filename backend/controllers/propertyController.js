import Property from '../models/Property.js';

export const getAllProperties = async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
};

export const createProperty = async (req, res) => {
  const property = new Property(req.body);
  await property.save();
  res.status(201).json(property);
};
