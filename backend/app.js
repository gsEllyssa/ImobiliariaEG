// backend/app.js

import express from 'express';
import cors from 'cors';

// --- IMPORTS DAS ROTAS ---
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js'; // <<<--- 1. ADICIONE ESTA LINHA
import tenantRoutes from './routes/tenant.routes.js';
import propertyRoutes from './routes/property.routes.js';
import contractRoutes from './routes/contract.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import receiptRoutes from './routes/receipt.routes.js';
import templateRoutes from './routes/template.routes.js';
import debugRoutes from './routes/debug.routes.js';

const app = express();

// --- MIDDLEWARES GLOBAIS ---
app.use(cors());
app.use(express.json());

// --- REGISTRO DAS ROTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes); // <<<--- 2. ADICIONE ESTA LINHA
app.use('/api/tenants', tenantRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/debug', debugRoutes);

// --- ROTA DE TESTE ---
app.get('/api', (req, res) => {
  res.send('Real Estate API is running successfully ✅');
});

export default app;