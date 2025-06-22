import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Importação das rotas
import contratoRotas from './routes/contratoRotas.js';
import pagamentoRotas from './routes/pagamentoRotas.js';
import imovelRotas from './routes/imovelRotas.js';
import reciboRotas from './routes/reciboRotas.js';
import inquilinoRotas from './routes/inquilinoRotas.js';
import debugRoutes from './routes/debugRoutes.js'; // Se estiver usando
// Remova 'tenantRoutes' se você já está usando 'inquilinoRotas'

// Configuração do ambiente
dotenv.config();

// Inicialização do app
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/contratos', contratoRotas);
app.use('/api/pagamentos', pagamentoRotas);
app.use('/api/imoveis', imovelRotas);
app.use('/api/recibos', reciboRotas);
app.use('/api/inquilinos', inquilinoRotas);
app.use('/api/debug', debugRoutes); // opcional

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado ao MongoDB');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
    );
  })
  .catch(err => {
    console.error('🔴 Erro ao conectar no MongoDB', err);
  });
