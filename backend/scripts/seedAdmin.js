import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/imobiliaria';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const existe = await User.findOne({ email: 'admin@meusistema.com' });
    if (existe) {
      console.log('⚠️ Usuário já existe');
      return process.exit(0);
    }

    const admin = new User({
      name: 'Admin',
      email: 'admin@meusistema.com',
      password: 'senhaSuperSecreta123!',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Usuário administrador criado com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao criar admin:', err);
    process.exit(1);
  }
};

seedAdmin();
