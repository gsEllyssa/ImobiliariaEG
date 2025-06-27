import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'gerente', 'visualizador'],
    default: 'admin'
  }
}, { timestamps: true });

// Antes de salvar, criptografa a senha
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método de instância para comparar senha no login
UsuarioSchema.methods.compararSenha = function (senhaInserida) {
  return bcrypt.compare(senhaInserida, this.senha);
};

export default mongoose.model('Usuario', UsuarioSchema);
