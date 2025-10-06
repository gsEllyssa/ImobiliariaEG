import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Importe o bcryptjs

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // ADIÇÃO 4: Mensagens de erro personalizadas
    required: [true, 'O nome é obrigatório.'],
    trim: true,
    minlength: [2, 'O nome deve ter pelo menos 2 caracteres.'],
  },
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório.'],
    unique: true,
    lowercase: true,
    trim: true,
    // ADIÇÃO 4: Validação de formato de e-mail com regex
    match: [/.+\@.+\..+/, 'Por favor, insira um e-mail válido.'],
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória.'],
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres.'],
    // ADIÇÃO 2: Oculta a senha por padrão ao buscar usuários
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
}, {
  timestamps: true,
});

// ADIÇÃO 1: Middleware (hook) para criptografar a senha ANTES de salvar no banco
userSchema.pre('save', async function(next) {
  // Executa a função apenas se a senha foi modificada (ou é nova)
  if (!this.isModified('password')) return next();

  // Gera o "salt" e cria o hash da senha
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ADIÇÃO 3: Método no Schema para comparar a senha enviada no login com a senha no banco
userSchema.methods.comparePassword = async function(candidatePassword) {
  // 'this.password' se refere à senha do documento do usuário encontrado
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);