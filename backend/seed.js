import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Inquilino from './models/Inquilino.js';
import Imovel from './models/Imovel.js';
import Contrato from './models/Contrato.js';
import Pagamento from './models/Pagamento.js';

dotenv.config();

const inquilinos = [
  { nome: "João da Silva", cpf: "12345678900", email: "joao@email.com", telefone: "31999999999" },
  { nome: "Maria Souza", cpf: "98765432100", email: "maria@email.com", telefone: "31998887777" },
  { nome: "Carlos Lima", cpf: "11122233344", email: "carlos@email.com", telefone: "31997776666" }
];

const imoveis = [
  { endereco: "Rua A, 123", tipo: "Apartamento", valor: 1200 },
  { endereco: "Rua B, 456", tipo: "Casa", valor: 1800 },
  { endereco: "Av. Central, 789", tipo: "Apartamento", valor: 1500 }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Inquilino.deleteMany();
    await Imovel.deleteMany();
    await Contrato.deleteMany();
    await Pagamento.deleteMany();

    const inq = await Inquilino.insertMany(inquilinos);
    const imo = await Imovel.insertMany(imoveis);

    const contratos = [
      {
        tipo: "aluguel",
        status: "ativo",
        inicio: new Date(),
        fim: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        id_inquilino: inq[0]._id,
        id_imovel: imo[0]._id
      },
      {
        tipo: "aluguel",
        status: "pendente",
        inicio: new Date(),
        fim: new Date(new Date().setMonth(new Date().getMonth() + 6)),
        id_inquilino: inq[1]._id,
        id_imovel: imo[1]._id
      }
    ];

    const cont = await Contrato.insertMany(contratos);

    const pagamentos = [
      { valor: 1200, metodo: "pix", status: "pago", data: new Date(), id_inquilino: inq[0]._id, id_contrato: cont[0]._id },
      { valor: 1800, metodo: "cartao", status: "pendente", data: new Date(), id_inquilino: inq[1]._id, id_contrato: cont[1]._id }
    ];

    await Pagamento.insertMany(pagamentos);

    console.log("✅ Banco populado com sucesso!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Erro ao popular banco:", err);
    mongoose.connection.close();
  }
}

seedDB();
