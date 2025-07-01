import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// ✅ Carrega variáveis de ambiente
dotenv.config();

// ✅ Importação das rotas
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import tenantRoutes from './routes/tenant.routes.js';
import contractRoutes from './routes/contract.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import receiptRoutes from './routes/receipt.routes.js';
import debugRoutes from './routes/debug.routes.js';

const app = express();
const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/imobiliaria';

// ✅ Middlewares globais
app.use(cors());
app.use(express.json());

// ✅ Rotas principais
app.use('/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/inquilinos', tenantRoutes);
app.use('/api/contratos', contractRoutes);
app.use('/api/pagamentos', paymentRoutes);
app.use('/api/recibos', receiptRoutes);
app.use('/api/debug', debugRoutes); // Apenas em ambiente de desenvolvimento

// ✅ Conexão com o MongoDB (modo moderno e profissional)
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado ao MongoDB com sucesso');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('🔴 Erro ao conectar no MongoDB:', error.message);
  });
