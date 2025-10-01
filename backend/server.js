// server.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js'; // Importa a aplicação configurada do app.js

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Define a porta do servidor e a URL do MongoDB
const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI;

// Função principal para iniciar o servidor
const startServer = async () => {
  try {
    // Conecta ao MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("🟢 Conectado ao MongoDB com sucesso");

    // Inicia o servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("🔴 Erro ao conectar ao MongoDB ou iniciar o servidor:", error);
    process.exit(1); // Encerra a aplicação em caso de erro crítico
  }
};

// Chama a função para iniciar tudo
startServer();