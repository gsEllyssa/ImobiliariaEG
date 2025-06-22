import mongoose from 'mongoose';

const InquilinoSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  email: String,
  telefone: String,
  dataCadastro: { type: Date, default: Date.now },
});

export default mongoose.model('Inquilino', InquilinoSchema);
