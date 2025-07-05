import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/imobiliaria';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado ao MongoDB com sucesso');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('🔴 Erro ao conectar no MongoDB:', error.message);
  });
