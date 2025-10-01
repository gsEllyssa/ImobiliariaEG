import express from 'express';
import { proteger } from '../middlewares/auth.middleware.js'; // 1. Importa o middleware de segurança

// Importa todos os models necessários
import Tenant from '../models/tenant.model.js';
import Property from '../models/property.model.js';
import Contract from '../models/contract.model.js';
import Payment from '../models/payment.model.js';
import Receipt from '../models/receipt.model.js';

const router = express.Router();

// 2. SÓ CRIA ESTAS ROTAS SE O AMBIENTE NÃO FOR DE PRODUÇÃO
if (process.env.NODE_ENV !== 'production') {
  
  // 3. APLICA A SEGURANÇA EM TODAS AS ROTAS DE DEBUG ABAIXO
  router.use(proteger);

  // Debug route: List all tenants
  router.get('/tenants', async (req, res) => {
    try {
      const data = await Tenant.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data.' });
    }
  });

  // Debug route: List all properties
  router.get('/properties', async (req, res) => {
    try {
      const data = await Property.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data.' });
    }
  });

  // ... (as outras rotas de listagem seguem o mesmo padrão) ...
  
  router.get("/contracts", async (req, res) => {
    try {
      const data = await Contract.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data." });
    }
  });

  router.get("/payments", async (req, res) => {
    try {
      const data = await Payment.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data." });
    }
  });

  router.get("/receipts", async (req, res) => {
    try {
      const data = await Receipt.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data." });
    }
  });
}

export default router;