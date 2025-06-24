import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Inquilino from './models/Inquilino.js';
import Imovel from './models/Imovel.js';
import Contrato from './models/Contrato.js';
import Payment from './models/Payment.js';
import Recibo from './models/Recibo.js';

dotenv.config();

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('🟢 Conectado ao MongoDB para popular dados');

  await Inquilino.deleteMany();
  await Imovel.deleteMany();
  await Contrato.deleteMany();
  await Payment.deleteMany();
  await Recibo.deleteMany();

  const inquilino1 = await Inquilino.create({
    nome: 'João da Silva',
    cpf: '12345678900',
    email: 'joao@email.com',
    telefone: '31988887777'
  });

  const inquilino2 = await Inquilino.create({
    nome: 'Marina Rocha',
    cpf: '98765432100',
    email: 'marina@email.com',
    telefone: '31999996666'
  });

  const imovel1 = await Imovel.create({
    endereco: 'Rua das Flores, 123 - Centro',
    tipo: 'Apartamento',
    amount: 1500
  });

  const imovel2 = await Imovel.create({
    endereco: 'Av. Brasil, 500 - Bairro Industrial',
    tipo: 'Casa',
    amount: 2000
  });

  const contrato1 = await Contrato.create({
    tenantId: inquilino1._id,
    imovelId: imovel1._id,
    dataInicio: new Date('2024-06-01'),
    dataFim: new Date('2025-06-01'),
    amountMensal: 1500,
    ativo: true
  });

  const contrato2 = await Contrato.create({
    tenantId: inquilino2._id,
    imovelId: imovel2._id,
    dataInicio: new Date('2024-06-15'),
    dataFim: new Date('2025-06-15'),
    amountMensal: 2000,
    ativo: true
  });

  const pagamento1 = await Payment.create({
    contractId: contrato1._id,
    tenantId: inquilino1._id,
    amount: 1500,
    paymentDate: new Date('2024-07-01'),
    method: 'Pix',
    status: 'Paid'
  });

  const pagamento2 = await Payment.create({
    contractId: contrato2._id,
    tenantId: inquilino2._id,
    amount: 2000,
    paymentDate: new Date('2024-07-15'),
    method: 'Cartão',
    status: 'Paid'
  });

  await Recibo.create({
    pagamentoId: pagamento1._id,
    contractId: contrato1._id,
    tenantId: inquilino1._id,
    dataEmissao: new Date('2024-07-01')
  });

  await Recibo.create({
    pagamentoId: pagamento2._id,
    contractId: contrato2._id,
    tenantId: inquilino2._id,
    dataEmissao: new Date('2024-07-15')
  });

  console.log('✅ Base populada com sucesso!');
  process.exit();
};

seedDB().catch((err) => {
  console.error('❌ Erro ao popular banco:', err);
  process.exit(1);
});
