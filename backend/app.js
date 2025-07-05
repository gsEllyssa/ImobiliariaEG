// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import tenantRoutes from './routes/tenant.routes.js';
import contractRoutes from './routes/contract.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import receiptRoutes from './routes/receipt.routes.js';
import debugRoutes from './routes/debug.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/inquilinos', tenantRoutes);
app.use('/api/contratos', contractRoutes);
app.use('/api/pagamentos', paymentRoutes);
app.use('/api/recibos', receiptRoutes);
app.use('/api/debug', debugRoutes);

export default app;
