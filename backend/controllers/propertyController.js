import Property from '../models/Imovel.js';

export const listarImoveis = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imóveis.' });
  }
};

export const criarImovel = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar imóvel.' });
  }
};
