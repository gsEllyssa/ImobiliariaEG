import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Importa todas as rotas padronizadas
import * as routes from './routes/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas da API com nomes em inglês
app.use('/api/auth', routes.authRoutes); // login e registro
app.use('/api/contracts', routes.contractRoutes);
app.use('/api/properties', routes.propertyRoutes);
app.use('/api/tenants', routes.tenantRoutes);
app.use('/api/payments', routes.paymentRoutes);
app.use('/api/receipts', routes.receiptRoutes);
app.use('/api/users', routes.userRoutes);
app.use('/api/templates', routes.templateRoutes);
app.use('/api/debug', routes.debugRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/imobiliaria')
  .then(() => {
    console.log('🟢 Conectado ao MongoDB');
    const PORT = process.env.PORT || 5050;
    app.listen(PORT, () =>
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
    );
  })
  .catch(err => {
    console.error('🔴 Erro ao conectar no MongoDB:', err);
  });
