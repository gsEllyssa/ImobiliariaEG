import express from 'express';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// ✅ Caminho absoluto para o arquivo usuarios.json
const caminhoUsuarios = path.resolve('usuarios.json');

// Chave secreta para o JWT
const JWT_SECRET = process.env.JWT_SECRET || 'segredo-super-seguro';

// 🔐 Rota de Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('📥 Corpo da requisição recebida:', req.body);

    // ⚠️ Verifica se o corpo da requisição está completo
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha obrigatórios.' });
    }

    // ⚠️ Verifica se o arquivo existe
    if (!fs.existsSync(caminhoUsuarios)) {
      return res.status(404).json({ error: 'Nenhum usuário cadastrado ainda.' });
    }

    // 📖 Lê os dados do arquivo
    const data = fs.readFileSync(caminhoUsuarios, 'utf8');
    const usuarios = JSON.parse(data);

    console.log('📚 Usuários cadastrados:', usuarios);

    // 🔍 Busca o usuário com email correspondente
    const usuario = usuarios.find((u) => u.email === email);

    // ❌ Usuário não encontrado
    if (!usuario) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    // 🔐 Verifica se a senha está correta
    const senhaValida = bcrypt.compareSync(password, usuario.password);
    if (!senhaValida) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    // 🔑 Gera o token JWT
    const token = jwt.sign(
      { id: usuario.id, name: usuario.name, email: usuario.email, role: usuario.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    // ✅ Login bem-sucedido
    res.json({
      message: 'Login efetuado com sucesso!',
      token,
      user: {
        name: usuario.name,
        email: usuario.email,
        role: usuario.role,
      }
    });
  } catch (erro) {
    console.error('❌ Erro ao realizar login:', erro);
    res.status(500).json({ error: 'Erro interno ao processar o login.' });
  }
});

export default router;
