import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

// 📁 Caminho absoluto do arquivo usuarios.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const caminhoArquivo = path.resolve(__dirname, '../usuarios.json');

// 🔍 Rota GET para listar todos os usuários
router.get('/', (req, res) => {
  try {
    // Verifica se o arquivo existe
    if (fs.existsSync(caminhoArquivo)) {
      const dados = fs.readFileSync(caminhoArquivo, 'utf8');
      const usuarios = JSON.parse(dados);
      res.json(usuarios);
    } else {
      res.status(404).json({ mensagem: 'Nenhum usuário cadastrado ainda.' });
    }
  } catch (erro) {
    console.error('❌ Erro ao ler usuários:', erro);
    res.status(500).json({ erro: 'Erro ao ler os dados dos usuários.' });
  }
});

export default router;
