import Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave-secreta';

export async function registrar(req, res) {
  try {
    const { nome, email, senha, tipo } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ erro: 'E-mail já cadastrado' });

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = new Usuario({ nome, email, senhaHash, tipo });
    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao registrar usuário' });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario || !(await usuario.validarSenha(senha))) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario._id, tipo: usuario.tipo }, JWT_SECRET, { expiresIn: '8h' });

    res.json({ token, nome: usuario.nome, tipo: usuario.tipo });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
}
