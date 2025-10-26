// backend/models/user.model.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

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
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres.'],
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'corretor'],
    default: 'corretor',
  },
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
  // ---> NOVOS CAMPOS PARA RECUPERAÇÃO DE SENHA <---
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Hook para criptografar a senha ANTES de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar senha
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para gerar o token de ATIVAÇÃO de conta
userSchema.methods.createActivationToken = function() {
  const activationToken = crypto.randomBytes(32).toString('hex');
  this.activationToken = crypto.createHash('sha256').update(activationToken).digest('hex');
  this.activationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 horas
  return activationToken;
};

// ---> NOVO MÉTODO PARA GERAR O TOKEN DE REDEFINIÇÃO DE SENHA <---
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Criptografa o token antes de salvar no banco
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Define a expiração para 10 minutos
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  // Retorna o token NÃO criptografado para ser enviado por e-mail
  return resetToken;
};

export default mongoose.model('User', userSchema);