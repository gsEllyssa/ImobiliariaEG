import mongoose from 'mongoose';

const inquilinoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Inquilino', inquilinoSchema);
