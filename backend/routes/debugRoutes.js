import express from 'express';
import Inquilino from '../models/Inquilino.js';
import Imovel from '../models/Imovel.js';
import Contrato from '../models/Contrato.js';
import Payment from '../models/Payment.js';
import Recibo from '../models/Recibo.js';

const router = express.Router();

router.get('/debug/inquilinos', async (req, res) => {
  try {
    const dados = await Inquilino.find();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar inquilinos' });
  }
});

router.get('/debug/imoveis', async (req, res) => {
  try {
    const dados = await Imovel.find();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imóveis' });
  }
});

router.get('/debug/contratos', async (req, res) => {
  try {
    const dados = await Contrato.find();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar contratos' });
  }
});

router.get('/debug/pagamentos', async (req, res) => {
  try {
    const dados = await Payment.find();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pagamentos' });
  }
});

router.get('/debug/recibos', async (req, res) => {
  try {
    const dados = await Recibo.find();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar recibos' });
  }
});

export default router;
