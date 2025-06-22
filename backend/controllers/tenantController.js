import Inquilino from '../models/Inquilino.js';

export const listarInquilinos = async (req, res) => {
  try {
    const lista = await Inquilino.find();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar inquilinos' });
  }
};

export const criarInquilino = async (req, res) => {
  try {
    const inquilino = new Inquilino(req.body);
    await inquilino.save();
    res.status(201).json(inquilino);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar inquilino', detalhes: err.message });
  }
};
