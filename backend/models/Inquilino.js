// backend/models/Inquilino.js
import mongoose from 'mongoose';

const inquilinoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  telefone: String,
  status: {
    type: String,
    enum: ['ativo', 'pendente', 'inativo'],
    default: 'ativo'
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  }
});

const Inquilino = mongoose.model('Inquilino', inquilinoSchema);
export default Inquilino;
