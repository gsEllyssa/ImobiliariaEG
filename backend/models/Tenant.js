import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
  nome: String,
  email: String,
  cpf: String,
  status: {
    type: String,
    enum: ['ativo', 'pendente', 'desativado'],
    default: 'ativo'
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Tenant', tenantSchema);
