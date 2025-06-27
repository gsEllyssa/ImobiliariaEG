import Inquilino from '../models/Inquilino.js';

export const listarInquilinos = async (req, res) => {
  try {
    const inquilinos = await Inquilino.find();
    res.json(inquilinos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar inquilinos.' });
  }
};

export const criarInquilino = async (req, res) => {
  try {
    const novoInquilino = new Inquilino(req.body);
    await novoInquilino.save();
    res.status(201).json(novoInquilino);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar inquilino.' });
  }
};
