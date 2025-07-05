import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo-super-seguro';

// 🔐 LOGIN
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    console.log('📥 Requisição recebida no login:', req.body);

    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const user = await User.findOne({ email });
    console.log('🔍 Usuário encontrado:', user);

    if (!user || !user.password) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    const senhaValida = await bcrypt.compare(password, user.password);
    if (!senhaValida) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('❌ Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro interno ao realizar login.' });
  }
}

// 👤 REGISTRO
export async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
    }

    const existente = await User.findOne({ email });
    if (existente) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(password, 10);

    const novoUsuario = new User({
      name,
      email,
      password: senhaCriptografada,
      role: role || 'user',
    });

    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    console.error('❌ Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao registrar.' });
  }
}

// ⚡ ACESSO RÁPIDO PARA DEMONSTRAÇÃO
export async function acessoRapido(req, res) {
  try {
    const user = await User.findOne({ email: 'admin@meusistema.com' });

    if (!user || !user.password) {
      return res.status(404).json({ error: 'Usuário de demonstração não encontrado.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('❌ Erro no acesso rápido:', error);
    res.status(500).json({ error: 'Erro interno no acesso rápido.' });
  }
}
