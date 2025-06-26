import express from 'express';
import Contrato from '../models/Contrato.js';

const router = express.Router();

// Listar todos os contratos com dados populados
router.get('/', async (req, res) => {
  try {
    const contratos = await Contrato.find()
      .populate('locatario')
      .populate('imovel')
      .sort({ updatedAt: -1 });

    res.json(contratos);
  } catch (err) {
    console.error('Erro ao buscar contratos:', err);
    res.status(500).json({ erro: 'Erro interno ao buscar contratos' });
  }
});

// Criar novo contrato
router.post('/', async (req, res) => {
  try {
    const novoContrato = new Contrato(req.body);
    await novoContrato.save();
    res.status(201).json(novoContrato);
  } catch (err) {
    console.error('Erro ao criar contrato:', err);
    res.status(500).json({ erro: 'Erro ao criar contrato' });
  }
});

// Buscar contrato por ID
router.get('/:id', async (req, res) => {
  try {
    const contrato = await Contrato.findById(req.params.id)
      .populate('locatario')
      .populate('imovel');

    if (!contrato) return res.status(404).json({ erro: 'Contrato não encontrado' });
    res.json(contrato);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar contrato' });
  }
});

// Atualizar contrato
router.put('/:id', async (req, res) => {
  try {
    const contratoAtualizado = await Contrato.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(contratoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar contrato' });
  }
});

export default router;
