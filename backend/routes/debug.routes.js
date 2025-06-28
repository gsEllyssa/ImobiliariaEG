import express from 'express';
import Inquilino from '../models/Inquilino.js';
import Imovel from '../models/Imovel.js';
import Contrato from '../models/Contrato.js';
import Payment from '../models/Payment.js';
import Recibo from '../models/Recibo.js';

const router = express.Router();

router.get('/inquilinos', async (req, res) => {
  const dados = await Inquilino.find();
  res.json(dados);
});

router.get('/imoveis', async (req, res) => {
  const dados = await Imovel.find();
  res.json(dados);
});

router.get('/contratos', async (req, res) => {
  const dados = await Contrato.find();
  res.json(dados);
});

router.get('/pagamentos', async (req, res) => {
  const dados = await Payment.find();
  res.json(dados);
});

router.get('/recibos', async (req, res) => {
  const dados = await Recibo.find();
  res.json(dados);
});

export default router;
