import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/imobiliaria';

if (process.env.NODE_ENV === 'production') {
  console.log('❌ Proibido rodar seed em produção!');
  process.exit(1);
}

const usuariosSeed = [
  {
    name: 'Admin',
    email: 'admin@meusistema.com',
    senha: 'senhaSuperSecreta123!',
    role: 'admin'
  },
  {
    name: 'Manager',
    email: 'manager@meusistema.com',
    senha: 'senhaManager123!',
    role: 'manager'
  },
  {
    name: 'Viewer',
    email: 'viewer@meusistema.com',
    senha: 'senhaViewer123!',
    role: 'viewer'
  }
];

const executarSeed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('📦 Conectado ao MongoDB para seed');

    for (const usuario of usuariosSeed) {
      const existe = await User.findOne({ email: usuario.email });

      if (existe) {
        console.log(`⚠️ Usuário ${usuario.email} já existe.`);
        continue;
      }

      const hash = await bcrypt.hash(usuario.senha, 10);
      await User.create({
        name: usuario.name,
        email: usuario.email,
        password: hash,
        role: usuario.role
      });

      console.log(`✅ Usuário ${usuario.email} criado com sucesso!`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao rodar o seed:', error);
    process.exit(1);
  }
};

executarSeed();
