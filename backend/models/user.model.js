// backend/models/user.model.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; // Importe o crypto para gerar o token

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório.'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Por favor, insira um e-mail válido.'],
  },
  password: {
    type: String,
    // REMOVIDO: required: true. A senha só será definida na ativação.
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres.'],
    select: false, // Ótima prática!
  },
  role: {
    type: String,
    enum: ['admin', 'corretor'], // Ajustado para ser mais específico
    default: 'corretor',
  },
  // ---> NOVOS CAMPOS PARA O FLUXO DE CONVITE <---
  status: {
    type: String,
    enum: ['PENDENTE', 'ATIVO'],
    default: 'PENDENTE',
  },
  activationToken: {
    type: String,
  },
  activationTokenExpires: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Hook para criptografar a senha ANTES de salvar (perfeito, não precisa mudar)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar senha (perfeito, não precisa mudar)
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// ---> NOVO MÉTODO PARA GERAR O TOKEN DE ATIVAÇÃO <---
userSchema.methods.createActivationToken = function() {
  // 1. Gerar o token simples
  const activationToken = crypto.randomBytes(32).toString('hex');

  // 2. Criptografar o token antes de salvar no banco (mais seguro)
  this.activationToken = crypto
    .createHash('sha256')
    .update(activationToken)
    .digest('hex');

  // 3. Definir o tempo de expiração (ex: 24 horas)
  this.activationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

  // 4. Retornar o token NÃO criptografado para ser enviado por e-mail
  return activationToken;
};


export default mongoose.model('User', userSchema);