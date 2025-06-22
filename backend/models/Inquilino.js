import mongoose from 'mongoose';

const InquilinoSchema = new mongoose.Schema({
  nome: String,
  cpf: { type: String, unique: true },
  email: String,
  telefone: String,
}, { timestamps: true });

export default mongoose.model('Inquilino', InquilinoSchema);
