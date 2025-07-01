// seed.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Inquilino from './models/Inquilino.js';
import Imovel from './models/Imovel.js';
import Contrato from './models/Contrato.js';
import Payment from './models/Payment.js';
import Recibo from './models/Recibo.js';

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 Conectado ao MongoDB');

    // 🔄 Limpar dados antigos
    await Promise.all([
      Inquilino.deleteMany(),
      Imovel.deleteMany(),
      Contrato.deleteMany(),
      Payment.deleteMany(),
      Recibo.deleteMany(),
    ]);
    console.log('🧹 Dados antigos removidos');

    // 👤 Inquilinos
    const [joao, marina] = await Inquilino.create([
      {
        nome: 'João da Silva',
        cpf: '12345678900',
        email: 'joao@email.com',
        telefone: '31988887777',
      },
      {
        nome: 'Marina Rocha',
        cpf: '98765432100',
        email: 'marina@email.com',
        telefone: '31999996666',
      },
    ]);

    // 🏠 Imóveis
    const [apto, casa] = await Imovel.create([
      {
        endereco: 'Rua das Flores, 123 - Centro',
        tipo: 'Apartamento',
        amount: 1500,
      },
      {
        endereco: 'Av. Brasil, 500 - Bairro Industrial',
        tipo: 'Casa',
        amount: 2000,
      },
    ]);

    // 📄 Contratos
    const [contratoJoao, contratoMarina] = await Contrato.create([
      {
        tenantId: joao._id,
        imovelId: apto._id,
        dataInicio: new Date('2024-06-01'),
        dataFim: new Date('2025-06-01'),
        amountMensal: 1500,
        ativo: true,
      },
      {
        tenantId: marina._id,
        imovelId: casa._id,
        dataInicio: new Date('2024-06-15'),
        dataFim: new Date('2025-06-15'),
        amountMensal: 2000,
        ativo: true,
      },
    ]);

    // 💳 Pagamentos
    const [pagJoao, pagMarina] = await Payment.create([
      {
        contractId: contratoJoao._id,
        tenantId: joao._id,
        amount: 1500,
        paymentDate: new Date('2024-07-01'),
        method: 'Pix',
        status: 'Paid',
      },
      {
        contractId: contratoMarina._id,
        tenantId: marina._id,
        amount: 2000,
        paymentDate: new Date('2024-07-15'),
        method: 'Cartão',
        status: 'Paid',
      },
    ]);

    // 📃 Recibos
    await Recibo.create([
      {
        pagamentoId: pagJoao._id,
        contractId: contratoJoao._id,
        tenantId: joao._id,
        dataEmissao: new Date('2024-07-01'),
      },
      {
        pagamentoId: pagMarina._id,
        contractId: contratoMarina._id,
        tenantId: marina._id,
        dataEmissao: new Date('2024-07-15'),
      },
    ]);

    console.log('✅ Base de dados populada com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao popular o banco:', err.message);
    process.exit(1);
  }
};

seedDB();
