// app.js
import express from 'express';
import cors from 'cors';

// Importa todas as suas rotas
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import tenantRoutes from './routes/tenant.routes.js';
import propertyRoutes from './routes/property.routes.js'; // Adicionei esta, que faltou no seu server.js
import contractRoutes from './routes/contract.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import receiptRoutes from './routes/receipt.routes.js';
import templateRoutes from './routes/template.routes.js';
import debugRoutes from './routes/debug.routes.js';

// Cria a aplicação
const app = express();

// Configura os middlewares globais
app.use(cors());
app.use(express.json());

// Configura as rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/inquilinos', tenantRoutes);
app.use('/api/imoveis', propertyRoutes); // Adicionei esta
app.use('/api/contratos', contractRoutes);
app.use('/api/pagamentos', paymentRoutes);
app.use('/api/recibos', receiptRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/debug', debugRoutes);

// Rota de "saúde" da API
app.get('/api', (req, res) => {
  res.send('API da Imobiliária rodando com sucesso ✅');
});

// Exporta a aplicação configurada
export default app;