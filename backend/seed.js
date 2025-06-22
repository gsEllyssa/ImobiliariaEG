import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Inquilino from './models/Inquilino.js';
import Imovel from './models/Imovel.js';
import Contrato from './models/Contrato.js';
import Pagamento from './models/Pagamento.js';
import Recibo from './models/Recibo.js';

dotenv.config();

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('🟢 Conectado ao MongoDB para popular dados');

  await Inquilino.deleteMany();
  await Imovel.deleteMany();
  await Contrato.deleteMany();
  await Pagamento.deleteMany();
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
    valor: 1500
  });

  const imovel2 = await Imovel.create({
    endereco: 'Av. Brasil, 500 - Bairro Industrial',
    tipo: 'Casa',
    valor: 2000
  });

  const contrato1 = await Contrato.create({
    inquilinoId: inquilino1._id,
    imovelId: imovel1._id,
    dataInicio: new Date('2024-06-01'),
    dataFim: new Date('2025-06-01'),
    valorMensal: 1500,
    ativo: true
  });

  const contrato2 = await Contrato.create({
    inquilinoId: inquilino2._id,
    imovelId: imovel2._id,
    dataInicio: new Date('2024-06-15'),
    dataFim: new Date('2025-06-15'),
    valorMensal: 2000,
    ativo: true
  });

  const pagamento1 = await Pagamento.create({
    contratoId: contrato1._id,
    inquilinoId: inquilino1._id,
    valor: 1500,
    dataPagamento: new Date('2024-07-01'),
    metodo: 'Pix',
    status: 'Pago'
  });

  const pagamento2 = await Pagamento.create({
    contratoId: contrato2._id,
    inquilinoId: inquilino2._id,
    valor: 2000,
    dataPagamento: new Date('2024-07-15'),
    metodo: 'Cartão',
    status: 'Pago'
  });

  await Recibo.create({
    pagamentoId: pagamento1._id,
    contratoId: contrato1._id,
    inquilinoId: inquilino1._id,
    dataEmissao: new Date('2024-07-01')
  });

  await Recibo.create({
    pagamentoId: pagamento2._id,
    contratoId: contrato2._id,
    inquilinoId: inquilino2._id,
    dataEmissao: new Date('2024-07-15')
  });

  console.log('✅ Base populada com sucesso!');
  process.exit();
};

seedDB().catch((err) => {
  console.error('❌ Erro ao popular banco:', err);
  process.exit(1);
});
