// server.js

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// ✅ Importação de rotas
import userRoutes from './routes/user.routes.js';
import tenantRoutes from './routes/tenant.routes.js';
import contractRoutes from './routes/contract.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import receiptRoutes from './routes/receipt.routes.js';
import debugRoutes from './routes/debug.routes.js'; // 🔍 Para testes e debug

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// ✅ Middlewares globais
app.use(cors());
app.use(express.json());

// ✅ Rotas principais
app.use('/api/usuarios', userRoutes);
app.use('/api/inquilinos', tenantRoutes);
app.use('/api/contratos', contractRoutes);
app.use('/api/pagamentos', paymentRoutes);
app.use('/api/recibos', receiptRoutes);
app.use('/api/debug', debugRoutes); // Somente em desenvolvimento

// ✅ Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/imobiliaria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('🟢 Conectado ao MongoDB com sucesso');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('🔴 Falha na conexão com o MongoDB:', error.message);
  });
